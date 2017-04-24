import { Injectable } from '@angular/core';
import { Offer } from './offer';
import { Cfield } from './cfield';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OffersService {

    private apiUrl = 'http://54.213.65.242/api/';
    //private apiUrl = 'http://localhost:8080/api/';

    constructor (private http: Http) {}

    getOffers(): Promise<Offer[]> {
		  return this.http.get(this.apiUrl+'offers')
					.toPromise()
					.then(response => response.json() as Offer[])
					.catch(this.handleError);
    }

    getCfields(): Promise<Cfield[]> {
      return this.http.get(this.apiUrl+'cfields')
          .toPromise()
          .then(response => response.json() as Cfield[])
          .catch(this.handleError);
    }

    sendForm(data): Promise<String> {
      return this.http.post(data.offerurl, data)
  				.toPromise()
  				.then(response => {
  					return response.json();
  				})
  				.catch(this.handleError);
    }
    jsonToQueryString(json) {
	    //return '?' + 
	    return Object.keys(json).map(function(key) {
	            return encodeURIComponent(key) + '=' +
	                encodeURIComponent(json[key]);
	        }).join('&');
	  }
    sendFormPHP(data: Object): any {
  		var $http = new XMLHttpRequest();
  		var $url = "http://54.186.127.51:8080/postform.php";
  		var $params = this.jsonToQueryString(data);//"lorem=ipsum&name=binny";
  		$http.open("POST", $url, false);

  		$http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  		$http.send($params);
  		return JSON.parse($http.responseText);
    }

    private handleError (error: any) {
  		let errMsg = (error.message) ? error.message :
  		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  		console.error(errMsg); // log to console instead
    }
}
