import { Component, OnInit, OnDestroy } from '@angular/core';
import { BalanceService} from '../../../balance.service';
import { Subscription } from 'rxjs/Subscription';
import { CustomerIdService } from '../../../customer-id.service';
import { WalletService } from './wallet.service';
import { ProgressbarModule } from 'ngx-bootstrap';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  responsedata : any ={};
  balance : any;
  subscription : Subscription;
  private customer_id = null;
  private percentage =  null;
  customer_name = "";
  customer_email = "";
  customer_phone_no = "";

  constructor(
    public balanceService: BalanceService,
    public customerIdService: CustomerIdService,
    public walletService: WalletService
    ) { this.subscription = this.balanceService.getBalance().subscribe(balance => {
        this.balance = balance; 
        this.percentage = (this.balance/25000)*100;
      }); }

  callBalance() {
    console.log(this.customer_id);
    this.walletService.fetchBalance(this.customer_id)
      .then(data => this.setBalance(data));
    
  }


  setBalance(data) {
    console.log(data);
    this.balanceService.updateBalance(data.wallet_amount);
    this.balance = data.wallet_amount;
    this.percentage = (this.balance/25000)*100;
  }

  ngOnInit() {
     this.balance = this.customerIdService.getBalance();
     this.percentage = (this.balance/25000)*100;
     this.customer_id = this.customerIdService.getUser();
     this.customer_email = this.customerIdService.getEmail();
     this.customer_name = this.customerIdService.getUserName();
     this.customer_phone_no = this.customerIdService.getPhone();
  }
  
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }


}
