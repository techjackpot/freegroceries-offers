import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OffersService } from "./offers.service";
import { Offer } from './offer';
import { Cfield } from './cfield';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  providers: [OffersService]
})

export class OffersComponent implements OnInit {

	offers: Offer[]
	cfields: Cfield[]
	isDataAvailable:boolean = false
	passedOfferCount:number = 0
	showNextButton:boolean = false
	queryParams: {}

	constructor(private activatedRoute: ActivatedRoute, private offersService: OffersService) { }

	ngOnInit() {
		let dob = 1900;
		let gender = '';
		let that = this;
		this.activatedRoute.queryParams.subscribe((params: Params) => {
			if(params['custom list selection']) dob = params['custom list selection'];
			if(params['custom gender']) gender = params['custom gender'];
			this.queryParams = Object.assign({}, params);
		});
		this.offersService.getCfields()
			.then((cfields) => {
				this.cfields = cfields.filter((cfield) => {
					cfield.selectedValue = '';
					return cfield;
				});
				this.offersService.getOffers()
					.then((offers: Offer[]) => {
						this.offers = offers.filter((offer) => {
							if(!offer.preqst.description) return false;
							offer.passed = false;
							offer.enabled = false;
							
							if(offer.checks.check_age.use) {
								if(offer.checks.check_age.low != null) {
									if(offer.checks.check_age.low > (new Date().getFullYear() - dob)) {
										return false;
									}
								}
								if(offer.checks.check_age.high != null) {
									if(offer.checks.check_age.high < (new Date().getFullYear() - dob)) {
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
							let new_cfields = [];
							for(let ckey in offer.cfields) {
								let cfield = offer.cfields[ckey];
								if(!cfield.use) continue;
								for(let key in that.cfields) {
									if(that.cfields[key]._id == cfield.cfield_id) {
										if(that.cfields[key].type=='hidden') {
											that.cfields[key].selectedValue = that.cfields[key].defaultValue;
										}
										new_cfields.push(Object.assign({selectedValue:''},that.cfields[key]));
									}
								}
							};
							offer.new_cfields = new_cfields;

							return offer;
						});
						console.log(this.offers);
						if(this.offers.length > 0) 
							this.isDataAvailable = true;
					});
			});
	}

	checkNextButton() {
		if(this.passedOfferCount == this.offers.length) {
	        let fullName = this.queryParams['name'];
	        let firstName = fullName.split(' ').slice(0, -1).join(' ');
			window.localStorage.setItem('fname',firstName);
			this.showNextButton = true;
		}
	}

	onClickLog (offer: Offer) {
		console.log(offer);
	}

	onClickNo (offer: Offer) {
		offer.passed = true;
		this.passedOfferCount ++;
		this.checkNextButton();
	}

	onCheckPrimary(offer: Offer, val) {
		if(offer.preqst.type=='checkbox') {
			if(val.primary != val.selected) {
				this.onClickNo(offer);
				return ;
			}
			if(offer.preqst.values.filter((el) => el.primary).some((el) => el.primary == el.selected)) {
				offer.enabled = true;
			}
		} else if(offer.preqst.type=='radio'){
			if(val.primary != (val.selected==val.value)) {
				this.onClickNo(offer);
				return ;
			}
			offer.enabled = true;
		} else {
			if(offer.preqst.values.filter((el) => el.primary).every((el) => el.value == offer.preqst.selectedValue)) {
				offer.enabled = true;
				return ;
			}
			this.onClickNo(offer);
			return ;
		}
		console.log(val);
	}

	onClickYes (offer: Offer) {
				let queryData = this.queryParams;

        let fullName = queryData['name'];
        queryData['name_first'] = queryData['name (awf_first)'] || fullName.split(' ').slice(0, -1).join(' ');
				queryData['naem_last'] = queryData['name (awf_last)'] || fullName.split(' ').slice(-1).join(' ');
				queryData['dob'] = '01/01/' + queryData['custom list selection'];

				let gender = queryData['custom gender'];
				if(gender == 'Male' || gender == 'M') {
					queryData['gender_long'] = 'Male';
					queryData['gender_short'] = 'M';
				}
				if(gender == 'Female' || gender == 'F') {
					queryData['gender_long'] = 'Female';
					queryData['gender_short'] = 'F';
				}

        let data = {
        	offerurl: offer.url,
        };
        if(offer.presets.length>0) {
        	offer.presets.forEach((preset) => {
        		if(!preset.source || !preset.target) return;
        		data[preset.target] = queryData[preset.source];
        	})
        }
        if(offer.new_cfields.length>0) {
        	for(let key in offer.new_cfields) {
        		let cfield = offer.new_cfields[key];
        		if(cfield.type=='checkbox') {
        			let checks = document.querySelectorAll("input[name='"+cfield.key+"[]']:checked");
        			if(!checks.length) continue;
        			let checks_vals = [];
        			for(let i=0; i<checks.length; i++) {
        				checks_vals.push(checks[i]['value']);
        			}
        			data[cfield.key] = checks_vals.join(',');
        		} else {
        			if(!cfield.selectedValue) continue;
        			data[cfield.key] = cfield.selectedValue;
        		}
        	}
        }
        if(offer.enabled == true && offer.preqst.type!='') {
        	data[offer.preqst.key] = offer.preqst.values.filter((el) => el.primary).map((el) => el.value).join(','); //offer.preqst.primaryValue;
        }

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
