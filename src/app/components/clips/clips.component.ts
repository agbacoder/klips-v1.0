import { Component, OnInit , ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Iclip from 'src/app/models/clip.model';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.component.html',
  styleUrl: './clips.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class ClipsComponent  implements OnInit{
  @ViewChild('videoPlayer', { static: true}) target?: ElementRef
  

 constructor( public route: ActivatedRoute){

 }
 player?: Player
 clip?: Iclip

 ngOnInit(): void {
  this.player = videojs(this.target?.nativeElement)
  this.route.data.subscribe(data => {
    this.clip = data.clip as Iclip

    this.player?.src({
      src: this.clip.url,
      type: 'video/mp4'
    })
  })
 }
}
