import * as jQuery from 'jquery';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {
    jQuery(".navbar-brand-overlay").addClass("load-animation");

    jQuery(".min-btn").click(function () {
      jQuery("#terminalCard").addClass("minimise-animation");
      jQuery("#terminalTaskBarItem").addClass("show");
    });

    jQuery("#terminalTaskBarItem").click(function () {
      jQuery("#terminalCard").removeClass("minimise-animation");
      jQuery("#terminalTaskBarItem").removeClass("show");
    });
  }

}
