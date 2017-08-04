import { Injectable } from '@angular/core';

@Injectable()
export class CustomerIdService {

  constructor() { }

  userID = null;
  balance = null;
  userName = "";
  successRegister = false;

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

  successReg(){
    this.successRegister = true;
  }

  isSuccess() {
    return this.successRegister;
  }
}
