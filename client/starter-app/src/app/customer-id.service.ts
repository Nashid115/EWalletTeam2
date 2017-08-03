import { Injectable } from '@angular/core';

@Injectable()
export class CustomerIdService {

  constructor() { }

  userID = null;
  balance = null;

  setUser(id) {
  	this.userID = id;
  }

  setBalance(balance) {
  	this.balance = balance;
  }

  getBalance(){
  	return this.balance;
  }

  getUser() {
  	return this.userID;
  }

  clearUser() {
  	this.userID = null;
  	return;
  }
}
