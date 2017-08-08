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
  get_add_data = null;
  get_send_data = null;
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

 setAddLimit(addlimit){
   this.get_add_data = addlimit;
 }

  getAddLimit(){
  return this.get_add_data;
 }
 setSendLimit(sendlimit){
   this.get_send_data = sendlimit;
 }
  
  getSendLimit(){
  return this.get_send_data;
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

  successReg(){
    this.successRegister = true;
  }

  isSuccess() {
    return this.successRegister;
  }
}
