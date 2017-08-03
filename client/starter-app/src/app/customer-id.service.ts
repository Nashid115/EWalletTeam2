import { Injectable } from '@angular/core';

@Injectable()
export class CustomerIdService {

  constructor() { }

  userID = null;
  balance = null;
  userName = "";

  setUser(id) {
  	this.userID = id;
  }

  setUserName(name) {
    this.userName = name;
  }

  getUserName() {
    return this.userName;
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
