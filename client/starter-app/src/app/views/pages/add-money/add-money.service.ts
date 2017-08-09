import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';

@Injectable()
export class AddMoneyService {
  
  private serverURL = "http://10.0.1.62:8080/api/customer/wallet";

  constructor(
  	public http : Http,
  	) { }

  addBalance(data) {
  	return this.http.post(this.serverURL, data)
  	.map(res => res.json());
  }	  

}
