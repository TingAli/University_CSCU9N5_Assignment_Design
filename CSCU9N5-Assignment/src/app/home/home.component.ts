import * as jQuery from 'jquery';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  method = [];
  components = ['ForLoopOne', 'ForLoopTwo', 'IfStatementOne', 'IfStatementTwo'];
  options: SortablejsOptions = {    
  };

  constructor(
    private router: Router) {

    this.options = {
      group: 'Manx Components',
    };
  }

  ifStatement(boolOne: boolean, boolTwo: boolean, outputOne: string, outputTwo: string) {
    var returnValue = "";
    
    if(boolOne) {
      returnValue + outputOne;
    }

    if(boolTwo) {
      returnValue + outputTwo;
    }

    return returnValue;
  }

  forLoop(startIndex: number, endIndex: number, increment: number, isLastInclusive: boolean): number {
    var result = 0;

    for (var index = startIndex; index <= endIndex; index+=increment)
    {         
        result = index;
    } 

    return result;
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
