import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { Http, Response } from '@angular/http';


@Injectable()
export class HistoryService {

	headers:any;

  private apiURL = 'http://10.0.1.30:8080/api/transactions/user/'

	constructor(
			private http : Http
		) {    this.headers = new Headers
    ({
        'Content-Type': 'application/json'
    });}

    getTransactions(customer_id) {
    	return this.http.get(this.apiURL+customer_id)
    		.toPromise()
    		.then(this.extractData)
    		.catch(this.handleError);
  	}

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    return error;
  } 	
}