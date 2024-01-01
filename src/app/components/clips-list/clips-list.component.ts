import { Component, OnDestroy, OnInit , Input} from '@angular/core';
import { ClipService } from 'src/app/services/clip.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  providers: [DatePipe]
})
export class ClipsListComponent implements OnInit, OnDestroy{

constructor ( public clipService: ClipService){
 this.clipService.getclips()
}

@Input() scrollable = true;

  ngOnInit(): void {
    if (this.scrollable){
      window.addEventListener('scroll', this.handleScroll)
     

    }
  }
  ngOnDestroy(): void {
    if (this.scrollable){
      window.removeEventListener('scroll', this.handleScroll)

    }
    this.clipService.pageClips = []
  }

  handleScroll = () => {
    const { scrollTop, offsetHeight} = document.documentElement
    const { innerHeight } = window
    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

    if (bottomOfWindow){
      this.clipService.getclips()
    }
  }
}
