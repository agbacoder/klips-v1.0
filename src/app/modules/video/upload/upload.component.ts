import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage'
import { v4 as uuid } from 'uuid';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app'
import { ClipService } from 'src/app/services/clip.service';
import { FfmpegService } from 'src/app/services/ffmpeg.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-upload',

  templateUrl: './upload.component.html',
})
export class UploadComponent implements OnDestroy{

  constructor (
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipsService: ClipService,
    private router: Router,
    public ffmpeg: FfmpegService
  ){ 
    auth.user.subscribe(user => this.user = user)
    this.ffmpeg.init()
  }



  isDragover = false;
  file: File | null = null
  chooseThumbnail = false
  

  inSubmission = false;

  showAlert = false
  alertMsg = 'Please wait! Your Video is being uploaded'
  alertColor = 'blue'

  percentage = 0
  showPercentage = false;
  user: firebase.User | null = null
  task?: AngularFireUploadTask
  screenshots: string[] = []
  selectedScreenshot = ''
  screenshotTask? : AngularFireUploadTask

  title = new FormControl('',{
    validators: [
      Validators.required
    ],
    nonNullable: true
  })
  uploadForm = new FormGroup({
    title: this.title
  })
  

  private ngUnsubscribe = new Subject<void>();
  private uploadCancel = new Subject<void>();

  ngOnDestroy(): void {
    this.task?.cancel();
    this.ngUnsubscribe.next();
    this.uploadCancel.next();
    this.ngUnsubscribe.complete();
  }

  async storeFile($event: Event){
    if (this.ffmpeg.isRunning){
      return
    }
    this.isDragover = false
    this.file = ($event as DragEvent).dataTransfer ?
    ($event as DragEvent).dataTransfer?.files.item(0) ?? null :
    ($event.target as HTMLInputElement).files?.item(0) ?? null
   
    if (!this.file || this.file.type !== 'video/mp4'){
      return
    }
    this.screenshots = await this.ffmpeg.getScreenshots(this.file);

    this.selectedScreenshot === this.screenshots[0]
    
    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, '')
    )
    this.chooseThumbnail = true
  }

  async uploadFile(){
    this.uploadForm.disable()
  this.showAlert = true
  this.alertMsg = 'Please wait! Your Video is being uploaded'
  this.alertColor = 'blue'
  this.inSubmission = true
  this.showPercentage = true
  
  const clipFileName = uuid()
  const clipPath = `clips/${clipFileName}.mp4`

  const screenshotBlob = await this.ffmpeg.blobUrl(
    this.selectedScreenshot
  )
  const screenshotPath = `screenshots/${clipFileName}.png`

  this.task = this.storage.upload(clipPath, this.file)
  const clipRef = this.storage.ref(clipPath)

  this.screenshotTask = this.storage.upload(screenshotPath, screenshotBlob)

  const screenshotRef = this.storage.ref(screenshotPath)

  combineLatest([
    this.task.percentageChanges(),
    this.screenshotTask.percentageChanges()
  ] ).subscribe(
    (progress) => {
      const [clipProg, screenshotProg] = progress

      if(!clipProg || !screenshotProg){
        return
      }
      const total = clipProg + screenshotProg

      this.percentage = total as number/200
    }
  )
  forkJoin([
    this.task.snapshotChanges(),
    this.screenshotTask.snapshotChanges()
  ]).pipe(
    switchMap(() => forkJoin([
      clipRef.getDownloadURL(), 
      screenshotRef.getDownloadURL()
    ])),
    takeUntil(this.uploadCancel)
  ).subscribe({
    next: async (urls) =>{

  const [clipUrl, screenshotUrl] = urls

  const clip = {
  uid: this.user?.uid as string,
  displayName: this.user?.displayName as string,
  title: this.title.value,
  fileName: `${clipFileName}.mp4`,
  url: clipUrl, 
  screenshotUrl,
  screenshotFilename: `${clipFileName}.png`,
  timestamp: firebase.firestore.FieldValue.serverTimestamp(),



}
  const clipDocRef = await this.clipsService.createClip(clip)

      this.alertColor = 'green'
      this.alertMsg = 'Upload Successful'
      this.showPercentage = false

      setTimeout(() => {
          this.router.navigate([
            'clip', clipDocRef.id
          ])
      }, 1000);
    },
    error: (error) => {
      this.uploadForm.enable()
      this.alertColor = 'red'
      this.alertMsg = 'Upload failed! please try again'
      this.inSubmission = false
      this.showPercentage = false
    }
  })
  }
  cancelUpload($event: Event){
      if (this.task) {
        // Cancel the ongoing upload task
        this.task.cancel();
        this.uploadCancel.next()

        // Reset form and variables
        this.uploadForm.enable();
        this.inSubmission = false;
        this.showPercentage = false;
          this.showAlert = true;
          this.alertMsg = 'Upload Cancelled!';
          this.alertColor = 'red';
          setTimeout(() => {
            this.showAlert = false
          }, 2000);
       
        

      
    }
    
  }


}
