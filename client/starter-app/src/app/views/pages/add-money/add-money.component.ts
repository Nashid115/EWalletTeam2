import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AddMoneyService } from './add-money.service';
import { BalanceService} from '../../../balance.service';
import { CustomerIdService } from '../../../customer-id.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.scss']
})
export class AddMoneyComponent implements OnInit {

  public addForm = this.fb.group({
     wallet_amount: ["",[ Validators.required, Validators.pattern("^(?:10000)$|^([1-9])$|^([1-9][0-9])$|^([1-9][0-9][0-9])$|^([1-9][0-9][0-9][0-9])$")]]
  });

  valid = true;
  show = true;
  balance = null;
  subscription : Subscription;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public addMoneyService: AddMoneyService,
    public balanceService: BalanceService,
    public customerIdService: CustomerIdService
    ) { this.subscription = this.balanceService.getBalance().subscribe(balance => this.balance = balance); }

  customer_id = this.customerIdService.getUser();

  add(form) {
    if((form._value.wallet_amount + this.balance) > 25000) {
      this.valid = false;
      setTimeout(() => this.valid = true , 3000);
      this.show = true;
    } else {
      this.valid = true;
      this.createObj(form._value.wallet_amount);
    }
  }

  createObj(val) {
    let obj= {
      customer_id : this.customer_id,
      wallet_amount : val
    }
    this.addMoney(obj);
  }

  addMoney(value){
    this.addMoneyService.addBalance(value)
    .subscribe(data => {
      this.balanceService.updateBalance(data.wallet_amount);
      this.show = false;
      setTimeout(() => this.show = true , 3000);
    });
  }


ngOnInit() {
  }

}
