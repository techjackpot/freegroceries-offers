import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor() { }

  fname : string = '';

  ngOnInit() {
  	this.fname = window.localStorage.getItem('fname');
  }

}
