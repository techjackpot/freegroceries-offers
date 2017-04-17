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
	isDataAvailable:boolean = false;

	constructor(private activatedRoute: ActivatedRoute, private offersService: OffersService) { }

	ngOnInit() {
		let dob = 1900;
		let gender = '';
		this.activatedRoute.queryParams.subscribe((params: Params) => {
			if(params['custom list selection']) dob = params['custom list selection'];
			if(params['custom gender']) gender = params['custom gender'];
		});
		this.offersService.getOffers()
		.then((offers: Offer[]) => {
			this.offers = offers.filter((offer) => {
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

}
