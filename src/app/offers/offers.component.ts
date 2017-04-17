import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OffersService } from "./offers.service";
import { Offer } from './offer';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  providers: [OffersService]
})

export class OffersComponent implements OnInit {

	offers: Offer[]
	isDataAvailable:boolean = false
	passedOfferCount:number = 0
	showNextButton:boolean = false
	queryParams: {}

	constructor(private activatedRoute: ActivatedRoute, private offersService: OffersService) { }

	ngOnInit() {
		let dob = 1900;
		let gender = '';
		this.activatedRoute.queryParams.subscribe((params: Params) => {
			if(params['custom list selection']) dob = params['custom list selection'];
			if(params['custom gender']) gender = params['custom gender'];
			this.queryParams = Object.assign({}, params);
		});
		this.offersService.getOffers()
		.then((offers: Offer[]) => {
			this.offers = offers.filter((offer) => {
				offer.passed = false;
				if(offer.checks.check_age.use) {
					if(offer.checks.check_age.cond=='greater') {
						if(offer.checks.check_age.val > (new Date().getFullYear() - dob)) {
							return false;
						}
					}
					if(offer.checks.check_age.cond=='less') {
						if(offer.checks.check_age.val < (new Date().getFullYear() - dob)) {
							return false;
						}
					}
				}
				if(offer.checks.check_gender1.use) {
					if(offer.checks.check_gender1.cond.toUpperCase() != gender.toUpperCase()) {
						return false;
					}
				}
				if(offer.checks.check_gender2.use) {
					if(offer.checks.check_gender2.cond.toUpperCase() != gender.toUpperCase()) {
						return false;
					}
				}
				return offer;
			});
			if(this.offers.length > 0) 
				this.isDataAvailable = true;
		});
	}

	checkNextButton() {
		if(this.passedOfferCount == this.offers.length) {
			this.showNextButton = true;
		}
	}

	onClickNo (offer: Offer) {
		offer.passed = true;
		this.passedOfferCount ++;
		this.checkNextButton();
	}

	onClickYes (offer: Offer) {
        let fullName = this.queryParams['name'];
        let firstName = fullName.split(' ').slice(0, -1).join(' ');
		let lastName = fullName.split(' ').slice(-1).join(' ');
		let dob = '01/01/' + this.queryParams['custom list selection'];
        let data = {
        	fname: firstName,
        	lname: lastName,
        	email: this.queryParams['email'],
        	mobile: this.queryParams['custom telephone number'],
        	streetaddress: this.queryParams['custom street address'],
        	citysuburb: this.queryParams['custom city or suburb'],
        	state: this.queryParams['custom state'],
        	postcode: this.queryParams['custom postcode'],
        	birth_year: this.queryParams['custom list selection'],
        	gender: this.queryParams['custom gender'],
        	offerurl: offer.url,
        	sid: this.getParameterByName('sid', offer.url),
        	campid: this.getParameterByName('campid', offer.url),
        	dob: dob
        }
        /*let data = {
        	firstname: firstName,
        	lastname: lastName,
        	email: this.queryParams['email'],
        	mobile: this.queryParams['custom telephone number'],
        	phone1: this.queryParams['custom telephone number'],
        	phone: this.queryParams['custom telephone number'],
        	street1: this.queryParams['custom street address'],
        	streetaddress1: this.queryParams['custom street address'],
        	citysuburb: this.queryParams['custom city or suburb'],
        	towncity: this.queryParams['custom city or suburb'],
        	state: this.queryParams['custom state'],
        	county: this.queryParams['custom state'],
        	postcode: this.queryParams['custom postcode'],
        	birthyear: this.queryParams['custom list selection'],
        	dob: dob,
        	gender: this.queryParams['custom gender'],
        	offerurl: offer.url,
        	sid: this.getParameterByName('sid', offer.url),
        	campid: this.getParameterByName('campid', offer.url),
        	ipaddress: '54.186.127.51',
        	source: 'http://www.freegroceries.com.au'
        };*/
        let response = this.offersService.sendFormPHP(data);
        if(response) {
        	console.log(response);
        	offer.passed = true;
			this.passedOfferCount ++;
			this.checkNextButton();
        }
	}


	getParameterByName(name, url) {
	    if (!url) {
	      url = window.location.href;
	    }
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

}
