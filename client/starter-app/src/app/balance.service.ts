import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BalanceService {
	private balance = new Subject<any>();


	updateBalance(value) {
		this.balance.next(value);
		
	}
	

	getBalance(): Observable<any> {
		return this.balance.asObservable();
		
	}
	

  constructor() { }

}
