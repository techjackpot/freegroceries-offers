import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private elementRef:ElementRef) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
	  var s = document.createElement("script");
	  s.type = "text/javascript";
	  s.src = "assets/js/jquery.js";
	  this.elementRef.nativeElement.appendChild(s);

	  var t = document.createElement("script");
	  t.type = "text/javascript";
	  t.src = "assets/js/main.js";
	  this.elementRef.nativeElement.appendChild(t);
  }

}
