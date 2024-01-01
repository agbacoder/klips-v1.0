import { Component, OnDestroy, OnInit , Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import Iclip from 'src/app/models/clip.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit, OnDestroy, OnChanges{

  @Input() activeClip: Iclip | null = null 


  inSubmission = false;

  showAlert = false
  alertMsg = 'Please wait! Updating clip.'
  alertColor = 'blue'
  @Output() update = new EventEmitter()

  clipId =new FormControl('', {
    nonNullable: true
  })
  
  title = new FormControl('',{
    validators: [
      Validators.required
    ],
    nonNullable: true
  })
  editForm = new FormGroup({
    title: this.title
  })

  constructor(private modal: ModalService,
              private clipService: ClipService){

  }
  ngOnInit(): void {
    this.modal.register('editClip')

  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip')
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.activeClip){
      return
    }
    this.inSubmission = false
    this.showAlert = false
    this.clipId.setValue(this.activeClip.docId as string)
    this.title.setValue(this.activeClip.title)
    
  }
  async submit(){

    if (!this.activeClip){
      return
    }
    this.inSubmission = true
    this.showAlert = true
    this.alertMsg = 'Please wait! Updating clip.'
    this.alertColor = 'blue'

    try {
      await this.clipService.updateClip(
        this.clipId.value, this.title.value
      )
      
    } catch (error) {
    this.inSubmission = false
    this.alertMsg = 'An error occured! Please try again.'
    this.alertColor = 'red'
    return
    }
    this.activeClip.title = this.title.value
    this.update.emit(this.activeClip)
    this.inSubmission = false
    this.alertMsg = 'Success!'
    this.alertColor = 'green'
    
  
  }

}
