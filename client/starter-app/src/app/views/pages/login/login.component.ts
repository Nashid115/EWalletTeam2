import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { CustomerIdService } from '../../../customer-id.service';
import { BalanceService } from '../../../balance.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 private validity = true;
 private show = false;

  public loginForm = this.fb.group({
    customer_detail: ["",[ Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$|^[789]\\d{9}$")]],
    customer_password: ["", Validators.required]
  });

  constructor(
    public router: Router, 
    public fb: FormBuilder,
    private loginService: LoginService,
    private customerIdService: CustomerIdService,
    private balanceService: BalanceService) { }
  
  checkIsSuccess(){
    if(this.customerIdService.isSuccess()){
      this.show = true;
    }
  }
   
  Login(form) {
    this.loginService.postLoginData(form._value)
    .subscribe(data => {
      console.log(data,"login data")
      this.checkUserValid(data);
      console.log(data,"login")
      },
      error => {
        this.handleError(error);
      });
  }

  checkUserValid(user: any) {
    if (user.customer_id) {
        this.customerIdService.setUser(user.customer_id);
        this.customerIdService.setUserName(user.customer_name);
        this.customerIdService.setBalance(user.wallet_amount.wallet_amount);
        this.customerIdService.setEmail(user.customer_email);
        this.customerIdService.setPhone(user.customer_phone_no);
        this.balanceService.updateBalance(user.wallet_amount.wallet_amount);
         this.customerIdService.setAddLimit(user.wallet_amount.todays_wallet_limit);
          //  this.balanceService.updateSendBalance(user.wallet_amount.todays_wallet_limit);
         this.customerIdService.setSendLimit(user.wallet_amount.send_limit);
        this.router.navigate(['./dashboard']);
        this.validity = true;
      } else {
        this.validity = false;
        setTimeout(() => this.validity = true , 3000);
      }
  }

  handleError(err) {
    if(err.status === 404){
      this.validity = false;
    }
  }

ngOnInit() {
  this.checkIsSuccess();
  }

}
