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

public requestForm = this.fb.group({
    requested_from: ['',[ Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$|^[789]\\d{9}$")]],
    amount: ['',[ Validators.required, Validators.pattern("^(?:10000)$|^([1-9])$|^([1-9][0-9])$|^([1-9][0-9][0-9])$|^([1-9][0-9][0-9][0-9])$")]]
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
      amount : val.amount
    }
    this.requestMoney(obj);
  }

  requestMoney(value){
    this.requestService.postRequestData(value)
    .subscribe(data => {
      if (data.sender_id){
        this.valid = false;
        setTimeout(() => this.valid = true , 3000);
      }
      else {
        this.valid = true;
      }
    });
  }


ngOnInit() {
  }

}
