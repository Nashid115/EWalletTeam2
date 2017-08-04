import { Injectable } from '@angular/core';

@Injectable()
export class CustomerIdService {

  constructor() { }

  userID = null;
  balance = null;
  userName = "";
  userEmail = "";
  userPhone = "";

  setUser(id) {
  	this.userID = id;
  }

  setUserName(name) {
    this.userName = name;
  }

  setEmail(email) {
    this.userEmail = email;
  }

  setBalance(balance) {
  	this.balance = balance;
  }

  setPhone(phone) {
    this.userPhone = phone;
  }

  getEmail() {
    return this.userEmail;
  }

  getUserName() {
    return this.userName;
  }

  getPhone() {
    return this.userPhone;
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
