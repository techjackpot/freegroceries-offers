import { Injectable } from '@angular/core';
import { Offer } from './offer';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OffersService {

    private offersUrl = 'http://localhost:8080/api/offers';

    constructor (private http: Http) {}

    getOffers(): Promise<Offer[]> {
		return this.http.get(this.offersUrl)
					.toPromise()
					.then(response => response.json() as Offer[])
					.catch(this.handleError);
    }

    private handleError (error: any) {
		let errMsg = (error.message) ? error.message :
		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
    }
}
