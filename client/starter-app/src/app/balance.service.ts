import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BalanceService {
	private balance = new Subject<any>();
	private addLimit = new Subject<any>();
	private sendLImit = new Subject<any>();

	updateBalance(value) {
		this.balance.next(value);
	}

	updateAddLimit(value) {
		this.addLimit.next(value);
	}

	updateSendLimit(value) {
		this.sendLImit.next(value);
	}
	
	getBalance(): Observable<any> {
		return this.balance.asObservable();
	}

	getAddLimit(): Observable<any> {
		return this.addLimit.asObservable();
	}

	getSendLimit(): Observable<any> {
		return this.sendLImit.asObservable();
	}
	

  constructor() { }

}
