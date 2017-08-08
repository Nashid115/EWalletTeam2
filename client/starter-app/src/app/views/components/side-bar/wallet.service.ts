import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';

@Injectable()
export class WalletService {
	private apiUrl = 'http://10.0.1.62:8080/api/customer/balance/';
	private getAddDaily = 'http://10.0.1.62:8080/api/customer/DailyAddTransactionLimit/';
		private getSendDaily ='http://10.0.1.62:8080/api/customer/DailySendTransaction/';
  constructor(
  	private http: Http) { }

  fetchBalance(id) {
  	return this.http.get(this.apiUrl+id)
  	.toPromise()
  	.then(res => res.json());
	}

	getaddDaily(id){
		return this.http.get(this.getAddDaily+id)
     .map((resp:Response) => resp.json())
		
	}
		getsendDaily(id){
		return this.http.get(this.getSendDaily+id)
     .map((resp:Response) => resp.json())
		
	}
	
	
	getDailyLimit(){

	}
}
