import * as jQuery from 'jquery';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SortablejsOptions } from 'angular-sortablejs';
import { BlockComponent } from '../shared/classes/blockComponent';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public forLoopOne: BlockComponent;
  public forLoopTwo: BlockComponent;
  public ifStatementOne: BlockComponent;
  public ifStatementTwo: BlockComponent;
  public output: Array<string>;
  public preQuotes: Array<string>;
  public quotes: Array<string>;
  public method: Array<BlockComponent>;
  public components: Array<BlockComponent>;
  public options: SortablejsOptions;
  
  constructor(
    private router: Router) {
      this.options = {
        group: {
          name: 'Manx Components'
        }
      };
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
    this.preQuotes.push("Start of an If Statement:");

    this.preQuotes.push("Checking Boolean One...");
    if(boolOne) {
      this.preQuotes.push("Boolean One is true, so it will output Output One.");
      returnValue += " " + outputOne;
    } else {
      this.preQuotes.push("Boolean One is false, so it will not output Output One.");;
    }

    this.preQuotes.push("Checking Boolean Two...");;
    if(boolTwo) {
      this.preQuotes.push("Boolean Two is true, so it will output Output Two.");
      returnValue += " " + outputTwo;
    } else {
      this.preQuotes.push("Boolean Two is false, so it will not output Output Two.");
    }

    this.preQuotes.push("End of an If Statement.");
    return returnValue;
  }

  forLoop(startIndex: number, endIndex: number, increment: number): number {
    var result = 0;
    this.preQuotes.push("Start of a For Loop:");

    for (var index = startIndex; index <= endIndex; index+=increment)
    {   
      this.preQuotes.push("Current Index: " + index);
      result = index;
      this.preQuotes.push("Current Result: " + result);
      this.preQuotes.push("Index will now be incremented by: " + increment);
    }

    this.preQuotes.push("End of a For Loop.");
    return result;
  }

  compile(): void {
    this.method.forEach(methodBlock => {
      if(methodBlock.isForLoop) {
        var forLoopStartIndexInputId = "#" + methodBlock.componentName + "-startIndex";
        var forLoopEndIndexInputId = "#" + methodBlock.componentName + "-endIndex";
        var forLoopIncrementInputId = "#" + methodBlock.componentName + "-increment";
        var forLoopStartIndexValue = parseInt(jQuery(forLoopStartIndexInputId).val().toString());
        var forLoopEndIndexValue = parseInt(jQuery(forLoopEndIndexInputId).val().toString());
        var forLoopIncrementValue = parseInt(jQuery(forLoopIncrementInputId).val().toString());

        var resultOfFor = this.forLoop(forLoopStartIndexValue, forLoopEndIndexValue, forLoopIncrementValue);      
        this.output.push(resultOfFor.toString());
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
        this.output.push(resultOfIf.toString());
      }

      this.preQuotes.forEach(preQuoteElement => {
        this.quotes.push(preQuoteElement);
      });
    });
  }

  validate(): boolean {    
    var result = true;

    this.method.forEach(methodBlock => {
      if(methodBlock.isForLoop) {
        var forLoopStartIndexInputId = "#" + methodBlock.componentName + "-startIndex";
        var forLoopEndIndexInputId = "#" + methodBlock.componentName + "-endIndex";
        var forLoopIncrementInputId = "#" + methodBlock.componentName + "-increment";
        var forLoopStartIndexValue = parseInt(jQuery(forLoopStartIndexInputId).val().toString());
        var forLoopEndIndexValue = parseInt(jQuery(forLoopEndIndexInputId).val().toString());
        var forLoopIncrementValue = parseInt(jQuery(forLoopIncrementInputId).val().toString());

        if((forLoopStartIndexValue < 0) || (forLoopEndIndexValue < forLoopStartIndexValue) || (forLoopIncrementValue < 0)) {
          result = false;
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

        if((ifStatementOutputOneValue.length == 0) || (ifStatementOutputTwoValue.length == 0)) {
          result = false;
        }
      }
    });

    return result;
  }

  run(): void {
    let audio = new Audio();
    audio.src = "./../../assets/click.mp3";
    audio.load();
    audio.play();

    this.preQuotes = [];
    this.quotes = [];
    this.output = [];

    if(this.validate()) {
      this.compile();
      this.doLoadAnimation();
    } else {
      jQuery("#validation-error").css("display", "block");
      jQuery("#validation-error").animate({
        opacity: 1,
      }, 3000, function() {
        jQuery("#validation-error").animate({
          opacity: 0,
        }, 3000, function() {
          jQuery("#validation-error").css("display", "none");          
        });
      });
    }
  }

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
    jQuery("#walkthrough").addClass("show");  
    
    jQuery(".tutorial-close-btn").click(function () {
      let audio = new Audio();
      audio.src = "./../../assets/click.mp3";
      audio.load();
      audio.play();
      jQuery("#walkthrough").removeClass("show");
    });

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

    jQuery(".close-btn").click(function () {
      let audio = new Audio();
      audio.src = "./../../assets/click.mp3";
      audio.load();
      audio.play();

      jQuery(window).scrollTop(0);
      jQuery("#page-close-overlay").css("display", "block");
      jQuery("#page-close-overlay").animate({opacity: "1"}, 3000);
      jQuery("body").css("overflow", "hidden");
    });

    jQuery("#terminalTaskBarItem").click(function () {
      jQuery("#terminalCard").removeClass("fullscreen-animation");      
      jQuery("#terminalCard").removeClass("minimise-animation");
      jQuery("#terminalTaskBarItem").removeClass("show");
    });
  }

}
