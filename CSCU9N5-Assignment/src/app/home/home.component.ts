import * as jQuery from 'jquery';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SortablejsOptions } from 'angular-sortablejs';
import { BlockComponent } from '../shared/classes/blockComponent';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private forLoopOne: BlockComponent;
  private forLoopTwo: BlockComponent;
  private ifStatementOne: BlockComponent;
  private ifStatementTwo: BlockComponent;
  private preOutput: Array<string>;  
  private output: Array<string>;
  private preQuotes: Array<string>;
  private quotes: Array<string>;
  private method: Array<BlockComponent>;
  private components: Array<BlockComponent>;
  private options: SortablejsOptions;
  
  constructor(
    private router: Router) {
      this.options = {
        group: {
          name: 'Manx Components'
        }
      };
      this.preOutput = [];
      this.output = [];
      this.preQuotes = [];
      this.quotes = [];
      this.method = [];
      this.forLoopOne = new BlockComponent("ForLoopOne", true, false);
      this.forLoopTwo = new BlockComponent("ForLoopTwo", true, false);
      this.ifStatementOne = new BlockComponent("IfStatementOne", false, true);
      this.ifStatementTwo = new BlockComponent("IfStatementTwo", false, true);
      this.components = [this.forLoopOne, this.forLoopTwo, this.ifStatementOne, this.ifStatementTwo];
  }

  ifStatement(boolOne: boolean, boolTwo: boolean, outputOne: string, outputTwo: string): string {
    var returnValue = "";
    
    if(boolOne) {
      returnValue + outputOne;
    }

    if(boolTwo) {
      returnValue + outputTwo;
    }

    return returnValue;
  }

  forLoop(startIndex: number, endIndex: number, increment: number): number {
    var result = 0;

    for (var index = startIndex; index <= endIndex; index+=increment)
    {         
        result = index;
    }

    return result;
  }

  validate(): boolean {
    
    return true;
  }

  run() {
    if(this.validate()) {
      this.preOutput.forEach(preOutputElement => {
        this.output.push(preOutputElement);
      });
      this.preQuotes.forEach(preQuoteElement => {
        this.quotes.push(preQuoteElement);
      });
    } else {

    }
  }

  ngOnInit() {
    jQuery(".navbar-brand-overlay").addClass("load-animation");

    jQuery(".min-btn").click(function () {
      jQuery("#terminalCard").addClass("minimise-animation");
      jQuery("#terminalTaskBarItem").addClass("show");
    });

    jQuery(".exp-btn").click(function () {
      if(jQuery("#terminalCard").hasClass("fullscreen-animation")) {
        jQuery("#terminalCard").removeClass("fullscreen-animation");
      } else {
        jQuery("#terminalCard").addClass("fullscreen-animation");
      }
    });

    jQuery("#terminalTaskBarItem").click(function () {
      jQuery("#terminalCard").removeClass("minimise-animation");
      jQuery("#terminalTaskBarItem").removeClass("show");
    });
  }

}
