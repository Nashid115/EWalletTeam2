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
 custName = "";
 show = true;
 custEmail ="";
 custPhone="";
 showSelf = true;
 hideLimit = true;


public sendForm = this.fb.group({
    emailphone: ["",[ Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$|^[789]\\d{9}$")]],
    sendamount: ["",[Validators.required, Validators.min(0), Validators.max(10000)]]
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
     "amount" : sendmoneydata.amount,
     "customer_name" : this.custName
    }
    if(this.custEmail === sendmoneydata.reciever || this.custPhone === sendmoneydata.reciever){
      this.showSelf = false;
      setTimeout(() => this.showSelf = true , 3000);
    } else {
      this.showSelf = true;
      console.log(obj);
      this.postFunction(obj);
    }
  }

}

  constructor(private sendMoneyService: SendMoneyService,
    private balanceService : BalanceService,
    private customerIdService   : CustomerIdService,
    public router : Router, 
    public fb: FormBuilder)
     { this.subscription = this.balanceService.getBalance().subscribe(balance => this.Balance = balance) }
    

postFunction(obj) {
  this.sendMoneyService.postRegister(obj)
    .then(data => {
      console.log(data,'x');
      this.wAmount(data);  
    },
  error =>{
   console.log(error.json());
   this.handleError(error);
  });
}

wAmount(data) {
  console.log(data,"send data");
    if(data.error){
      this.show = false;
      setTimeout(() => this.show = true , 3000);
    } else {
        this.show = true;
        this.success=false;
        setTimeout(() => this.success = true , 3000);
        this.validity=true;
        this.balanceService.updateBalance(data.wallet_amount);
        this.balanceService.updateSendLimit(data.send_limit);
    }
}
handleError(error){
  console.log(error.json(), "error recieve");
  if(error.json().error){
    this.show = false;
  } else if(error.status === 400 && error.json().send_limit === 10000){
    this.hideLimit = false;
    setTimeout(() => this.hideLimit = true , 3000);
  } else if(error.status === 400){
   this.validity=false;
   setTimeout(() => this.validity = true , 3000);
  }
}

ngOnInit() {
  this.Balance = this.customerIdService.getBalance();
  this.custName = this.customerIdService.getUserName();
  this.custEmail = this.customerIdService.getEmail();
  this.custPhone = this.customerIdService.getPhone();
  }

}  
