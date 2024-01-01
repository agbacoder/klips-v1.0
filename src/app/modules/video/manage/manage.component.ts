import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClipService } from 'src/app/services/clip.service';
import Iclip from 'src/app/models/clip.model'
import { ModalService } from 'src/app/services/modal.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
})
export class ManageComponent implements OnInit{

videoOrder = '1';
clips: Iclip[] = []
activeClip: Iclip | null = null
sort$: BehaviorSubject<string>

constructor(
  private route: Router, 
  private activeRoute: ActivatedRoute,
  private clipService: ClipService, private modal: ModalService
) {
  this.sort$ = new BehaviorSubject(this.videoOrder)
  
}
ngOnInit(): void {
  this.activeRoute.queryParams.subscribe((params: Params) => {
    this.videoOrder = params.sort === '2' ? params.sort : '1';
    this.sort$.next(this.videoOrder)
  })
  this.clipService.getUserClips(this.sort$).subscribe(docs => {
    this.clips = []

    docs.forEach(doc => {
      this.clips.push({
        docId: doc.id,
        ...doc.data()
      })
    })
  })
}

sort(event: Event){
  const { value } = (event.target as HTMLSelectElement)
  this.route.navigate([], {
    relativeTo: this.activeRoute, 
    queryParams: {
      sort: value
    }
  })

}
openModal($event: Event, clip: Iclip){
  $event.preventDefault()
  this.activeClip = clip
  this.modal.toggleModal('editClip')
}

update($event: Iclip){
  this.clips.forEach((element, index) => {
    if (element.docId == $event.docId){
      this.clips[index].title = $event.title
    }
  })
}
deleteClip($event: Event, clip: Iclip){
  $event.preventDefault()
  this.clipService.deleteClip(clip)

  this.clips.forEach((element, index) => {
    if (element.docId == clip.docId){
      this.clips.splice(index, 1)
    }
  })
}
  async copyToClipboard($event: MouseEvent, docId: string | undefined){
    $event.preventDefault()

    if(!docId){
      return
    }
    const url = `${location.origin}/clip/${docId}`

    await navigator.clipboard.writeText(url)

    alert('link copied')
  }
}
