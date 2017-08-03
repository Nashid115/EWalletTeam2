import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SendMoneyService } from './send-money.service';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.scss']
})
export class SendMoneyComponent implements OnInit {
 resposedata={};
public sendForm = this.fb.group({
    emailphone: ["",[ Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$|\\d{10}")]],
    sendamount: ["",[ Validators.required, Validators.pattern("^(?:10000)$|^([1-9])$|^([1-9][0-9])$|^([1-9][0-9][0-9])$|^([1-9][0-9][0-9][0-9])$")]]
  });
balance : 25000;
checkCondition(resposedata){
  if(this.responsedata.)

}
  
  constructor(private _sendMoneyService: SendMoneyService,
    public router : Router, public fb: FormBuilder) { }
    
  send(form) {
    this.router.navigate(['./']);
  }

postFunction(sendmoneydata) {
  this._sendMoneyService.postRegister(sendmoneydata)
    .subscribe(data => {
      this.resposedata = JSON.stringify(data);  
  });
}


ngOnInit() {
  }

}  
