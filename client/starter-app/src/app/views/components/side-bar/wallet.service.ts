import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';

@Injectable()
export class WalletService {
	private apiUrl = 'http://10.0.1.62:8080/api/customer/balance/';
  constructor(
  	private http: Http) { }

  fetchBalance(id) {
  	return this.http.get(this.apiUrl+id)
  	.toPromise()
  	.then(res => res.json());
  }
}
