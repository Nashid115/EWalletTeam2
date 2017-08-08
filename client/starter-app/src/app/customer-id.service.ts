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
   }
  get_add_data = null;
  get_send_data = null;
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


  getAddLimit(){
    this.get_add_data = JSON.parse(localStorage.getItem('user')).wallet_amount.todays_wallet_limit;
    return this.get_add_data;
   }
  
  getSendLimit(){
    this.get_send_data = JSON.parse(localStorage.getItem('user')).wallet_amount.send_limit;
    return this.get_send_data;
   }

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
