import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestMoneyService } from './request-money.service';
import { CustomerIdService } from '../../../customer-id.service';



@Component({
  selector: 'app-request-money',
  templateUrl: './request-money.component.html',
  styleUrls: ['./request-money.component.scss']
})
export class RequestMoneyComponent implements OnInit {
private val: any;
valid = true;
private cust_name = "";
custEmail = "";
custPhone = "";
showSelf = true;

public requestForm = this.fb.group({
    requested_from: ['',[ Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$|^[789]\\d{9}$")]],
    amount: ['',[ Validators.required, Validators.pattern("^(?:10000)$|^[0-9]{1,7}(\.[0-9]+)?$")]]
  });

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private requestService: RequestMoneyService,
    public customerIdService: CustomerIdService) { }

    customer_id = this.customerIdService.getUser();

  request(form) {
    this.createObj(form._value);
  }

  createObj(val) {
    let obj= {
      customer_id : this.customer_id,
      requested_from : val.requested_from,
      amount : val.amount,
      customer_name : this.cust_name
    }
    //console.log(obj.customer_name);
    if(this.custEmail === obj.requested_from || this.custPhone === obj.requested_from){
      this.showSelf = false;
      setTimeout(() => this.showSelf = true , 3000);
    } else {
      this.requestMoney(obj);
    }
  }

  requestMoney(value){
    this.requestService.postRequestData(value)
    .subscribe(data => {
      console.log(data, "in cmp");
      if (data.sender_id){
        console.log(data.sender_id);
        this.valid = false;
        setTimeout(() => this.valid = true , 3000);
      }
      else {
        this.valid = true;
      }
    });
  }


ngOnInit() {
  this.cust_name = this.customerIdService.getUserName();
  this.custEmail = this.customerIdService.getEmail();
  this.custPhone = this.customerIdService.getPhone();
  this.customer_id = this.customerIdService.getUser();
  }

}
