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
      returnValue += outputOne;
    }

    if(boolTwo) {
      returnValue += outputTwo;
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

  compile(): void {
    this.preOutput.forEach(preOutputElement => {
      this.output.push(preOutputElement);
    });
    this.preQuotes.forEach(preQuoteElement => {
      this.quotes.push(preQuoteElement);
    });

    this.method.forEach(methodBlock => {
      if(methodBlock.isForLoop) {
        var forLoopStartIndexInputId = "#" + methodBlock.componentName + "-startIndex";
        var forLoopEndIndexInputId = "#" + methodBlock.componentName + "-endIndex";
        var forLoopIncrementInputId = "#" + methodBlock.componentName + "-increment";
        var forLoopStartIndexValue = parseInt(jQuery(forLoopStartIndexInputId).val().toString());
        var forLoopEndIndexValue = parseInt(jQuery(forLoopEndIndexInputId).val().toString());
        var forLoopIncrementValue = parseInt(jQuery(forLoopIncrementInputId).val().toString());

        var resultOfFor = this.forLoop(forLoopStartIndexValue, forLoopEndIndexValue, forLoopIncrementValue);      
      }
      else if(methodBlock.isIfStatement) {
        var ifStatementBoolOneInputId = "#" + methodBlock.componentName + "-bool-one";
        var ifStatementBoolTwoInputId = "#" + methodBlock.componentName + "-bool-two";
        var ifStatementOutputOneInputId = "#" + methodBlock.componentName + "-output-one";
        var ifStatementOutputTwoInputId = "#" + methodBlock.componentName + "-output-two";
        var ifStatementBoolOneValue = jQuery(ifStatementBoolOneInputId).val() === "true";
        var ifStatementBoolTwoValue = jQuery(ifStatementBoolTwoInputId).val() === "true";
        var ifStatementOutputOneValue = jQuery(ifStatementOutputOneInputId).val().toString();
        var ifStatementOutputTwoValue = jQuery(ifStatementOutputTwoInputId).val().toString();

        var resultOfIf = this.ifStatement(ifStatementBoolOneValue, ifStatementBoolTwoValue, 
          ifStatementOutputOneValue, ifStatementOutputTwoValue);
      }
    });
  }

  validate(): boolean {
    this.doLoadAnimation();

    this.method.forEach(methodBlock => {
      if(methodBlock.isForLoop) {
        var forLoopStartIndexInputId = "#" + methodBlock.componentName + "-startIndex";
        var forLoopEndIndexInputId = "#" + methodBlock.componentName + "-endIndex";
        var forLoopIncrementInputId = "#" + methodBlock.componentName + "-increment";
        var forLoopStartIndexValue = parseInt(jQuery(forLoopStartIndexInputId).val().toString());
        var forLoopEndIndexValue = parseInt(jQuery(forLoopEndIndexInputId).val().toString());
        var forLoopIncrementValue = parseInt(jQuery(forLoopIncrementInputId).val().toString());

        if((!jQuery.isNumeric(forLoopStartIndexValue) && forLoopStartIndexValue < 0) || (!jQuery.isNumeric(forLoopEndIndexValue) && forLoopEndIndexValue < forLoopStartIndexValue) || (!jQuery.isNumeric(forLoopIncrementValue) && forLoopIncrementValue < 0)) {
          return false;
        }
      }
      else if (methodBlock.isIfStatement) {
        var ifStatementBoolOneInputId = "#" + methodBlock.componentName + "-bool-one";
        var ifStatementBoolTwoInputId = "#" + methodBlock.componentName + "-bool-two";
        var ifStatementOutputOneInputId = "#" + methodBlock.componentName + "-output-one";
        var ifStatementOutputTwoInputId = "#" + methodBlock.componentName + "-output-two";
        var ifStatementBoolOneValue = jQuery(ifStatementBoolOneInputId).val() === "true";
        var ifStatementBoolTwoValue = jQuery(ifStatementBoolTwoInputId).val() === "true";
        var ifStatementOutputOneValue = jQuery(ifStatementOutputOneInputId).val().toString();
        var ifStatementOutputTwoValue = jQuery(ifStatementOutputTwoInputId).val().toString();

        if((ifStatementOutputOneValue.length <= 0) || (ifStatementOutputTwoValue.length <= 0)) {
          return false;
        }
      }
    });

    return true;
  }

  run(): void {
    if(this.validate()) {
      this.compile();
      this.doLoadAnimation();
    } else {

    }
  }

  doLoadAnimation(): void {
    jQuery(".navbar-brand-overlay").addClass("load-animation");
  }

  ngOnInit() {
    this.doLoadAnimation();

    jQuery(".min-btn").click(function () {
      jQuery("#terminalCard").removeClass("fullscreen-animation");      
      jQuery("#terminalCard").addClass("minimise-animation");
      jQuery("#terminalTaskBarItem").addClass("show");
    });

    jQuery(".exp-btn").click(function () {
      if(jQuery("#terminalCard").hasClass("fullscreen-animation")) {
        jQuery("#terminalCard").removeClass("fullscreen-animation");
      } else {
        jQuery("#terminalCard").removeClass("minimise-animation");
        jQuery("#terminalCard").addClass("fullscreen-animation");
      }
    });

    jQuery("#terminalTaskBarItem").click(function () {
      jQuery("#terminalCard").removeClass("fullscreen-animation");      
      jQuery("#terminalCard").removeClass("minimise-animation");
      jQuery("#terminalTaskBarItem").removeClass("show");
    });
  }

}
