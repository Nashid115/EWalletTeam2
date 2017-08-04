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
 data={};
public sendForm = this.fb.group({
    emailphone: ["",[ Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$|^[789]\\d{9}$")]],
    sendamount: ["",[ Validators.required, Validators.pattern("^(?:10000)$|^([1-9])$|^([1-9][0-9])$|^([1-9][0-9][0-9])$|^([1-9][0-9][0-9][0-9])$")]]
  });

  
  constructor(private sendMoneyService: SendMoneyService,
    public router : Router, public fb: FormBuilder) { }
    
  send(form) {
    this.router.navigate(['./']);
  }

postFunction(data) {
  this.sendMoneyService.postRegister(data)
    .subscribe(data => {
      this.data = JSON.stringify(data);  
  });
}


ngOnInit() {
  }

}  
