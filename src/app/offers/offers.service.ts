import { Injectable } from '@angular/core';
import { Offer } from './offer';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OffersService {

    private offersUrl = 'http://ec2-54-213-65-242.us-west-2.compute.amazonaws.com/api/offers';

    constructor (private http: Http) {}

    getOffers(): Promise<Offer[]> {
		return this.http.get(this.offersUrl)
					.toPromise()
					.then(response => response.json() as Offer[])
					.catch(this.handleError);
    }

    sendForm(data): Promise<String> {
    	console.log(data);
      return this.http.post(data.offerurl, data)
      				.toPromise()
      				.then(response => {
      					console.log(response);
      					//return true;
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
        /*let bodyString = JSON.stringify(data); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers, body: bodyString });
      	return this.http.post('http://localhost/postform.php', data, options)
      				.toPromise()
      				.then(response => {
      					console.log(response);
      					//return true;
      					return response.toString();
      				})
      				.catch(this.handleError);*/
		var $http = new XMLHttpRequest();
		var $url = "http://ec2-54-186-127-51.us-west-2.compute.amazonaws.com:8080/postform.php";
		var $params = this.jsonToQueryString(data);//"lorem=ipsum&name=binny";
		$http.open("POST", $url, false);

		//Send the proper header information along with the request
		$http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		/*$http.onreadystatechange = function() {//Call a function when the state changes.
		    if($http.readyState == 4 && $http.status == 200) {
		        JSON.parse($http.responseText);
		    }
		}*/
		$http.send($params);
		return JSON.parse($http.responseText);
    }

    private handleError (error: any) {
		let errMsg = (error.message) ? error.message :
		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
    }
}
