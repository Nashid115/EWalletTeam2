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
responseData : any;
validity = true;

  public loginForm = this.fb.group({
    customer_detail: ["",[ Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$|\\d{10}")]],
    customer_password: ["", Validators.required]
  });

  constructor(
    public router: Router, 
    public fb: FormBuilder,
    private loginService: LoginService,
    private customerIdService: CustomerIdService,
    private balanceService: BalanceService) { }

  Login(form) {
    this.loginService.postLoginData(form._value)
    .subscribe(data => {
      this.checkUserValid(data);
      },
      error => {
        this.handleError(error);
      });
  }

  checkUserValid(user: any) {
    if (user.customer_id) {
        this.customerIdService.setUser(user.customer_id);
        this.customerIdService.setBalance(user.wallet_amount.wallet_amount);
        this.balanceService.updateBalance(user.wallet_amount.wallet_amount);
        this.router.navigate(['./dashboard']);
        this.validity = true;
      } else {
        this.validity = false;
      }
  }

  handleError(err) {
    if(err.status === 404){
      this.validity = false;
    }
  }

ngOnInit() {
  }

}
