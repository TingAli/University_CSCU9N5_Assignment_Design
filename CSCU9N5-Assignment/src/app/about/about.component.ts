import * as jQuery from 'jquery';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  doLoadAnimation(): void {
    jQuery(".navbar-brand-overlay").addClass("load-animation");
  }

  playClickSound(): void {
    let audio = new Audio();
    audio.src = "./../../assets/click.mp3";
    audio.load();
    audio.play();
  }

  ngOnInit() {
    this.doLoadAnimation();
  }

}
