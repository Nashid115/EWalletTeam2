import { Injectable } from '@angular/core';

@Injectable()
export class CustomerIdService {

  constructor() { }

  userID = null;
  balance = null;
  userName = "";
  successRegister = false;
  userEmail = "";
  userPhone = "";
  user : any

  setUser(obj) {
    localStorage.setItem('user',obj);
    // this.user = JSON.parse(sessionStorage.getItem('user'));
    // console.log(this.user,"in service");
  	//this.userID = id;
  }

  // setUserName(name) {
  //   this.userName = name;
  // }

  // setEmail(email) {
  //   this.userEmail = email;
  // }

  // setBalance(balance) {
  // 	this.balance = balance;
  // }

  // setPhone(phone) {
  //   this.userPhone = phone;
  // }

  getEmail() {
    this.userEmail = JSON.parse(localStorage.getItem('user')).customer_email;
    return this.userEmail;
  }

  getUserName() {
    this.userName = JSON.parse(localStorage.getItem('user')).customer_name;
    return this.userName;
  }

  getPhone() {
    this.userPhone = JSON.parse(localStorage.getItem('user')).customer_phone_no;
    return this.userPhone;
  }

  getBalance(){
    this.balance = JSON.parse(localStorage.getItem('user')).wallet_amount.wallet_amount;
  	return this.balance;
  }

  getUser() {
    this.userID = JSON.parse(localStorage.getItem('user')).customer_id;
  	return this.userID;
  }

  clearUser() {
    localStorage.clear();
  	//this.userID = null;
  	return;
  }

  successReg(){
    this.successRegister = true;
  }

  isSuccess() {
    return this.successRegister;
  }
}
