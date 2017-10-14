import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private elementRef:ElementRef) { }

  fname : string = '';

  ngOnInit() {
  	this.fname = window.localStorage.getItem('fname');
  }

  ngAfterViewInit() {
	  var s = document.createElement("script");
	  s.type = "text/javascript";
	  s.src = "/assets/js/jquery.js";
	  this.elementRef.nativeElement.appendChild(s);

	  var t = document.createElement("script");
	  t.type = "text/javascript";
	  t.src = "/assets/js/main1.js";
	  this.elementRef.nativeElement.appendChild(t);
  }

}
