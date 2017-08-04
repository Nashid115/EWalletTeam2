import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { SendMoneyService } from './send-money.service';
import { BalanceService} from '../../../balance.service';
import { CustomerIdService } from '../../../customer-id.service';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.scss']
})
export class SendMoneyComponent implements OnInit {
  sendmoneydata:any={};
 responsedata :any ={};
 subscription: Subscription; 
 Balance = null;
 errormsg:any;
 success=true;
 greateramount=true;
 validity=true;
public sendForm = this.fb.group({
    emailphone: ["",[ Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$|^[789]\\d{9}$")]],
    sendamount: ["",[ Validators.required, Validators.pattern("^(?:10000)$|^([1-9])$|^([1-9][0-9])$|^([1-9][0-9][0-9])$|^([1-9][0-9][0-9][0-9])$")]]
  });

checkCondition(sendmoneydata){
 
  if(sendmoneydata.amount > this.Balance){
  this.greateramount=false;
  setTimeout(() => this.greateramount = true , 3000);
  }
  else{
  this.greateramount=true;
   let obj={
     "customer_id" : this.customerIdService.getUser(),
     "reciever" : sendmoneydata.reciever,
     "amount" : sendmoneydata.amount

    }
    this.postFunction(obj);
  }

}

  constructor(private sendMoneyService: SendMoneyService,
    private balanceService : BalanceService,
    private customerIdService : CustomerIdService,
    public router : Router, 
    public fb: FormBuilder)
     { this.subscription = this.balanceService.getBalance().subscribe(balance => this.Balance = balance) }
    

postFunction(obj) {
  this.sendMoneyService.postRegister(obj)
    .then(data => {
    this.wAmount(data);  
  },
error =>{
   this.handleError(error);
});
}

wAmount(data) {
    this.success=false;
    setTimeout(() => this.success = true , 3000);
    this.validity=true;
    this.balanceService.updateBalance(data.wallet_amount);
}
handleError(error){
  if(error.status === 400){
   this.validity=false;
   setTimeout(() => this.validity = true , 3000);
  }
}

ngOnInit() {
  this.Balance = this.customerIdService.getBalance();
  }

}  
