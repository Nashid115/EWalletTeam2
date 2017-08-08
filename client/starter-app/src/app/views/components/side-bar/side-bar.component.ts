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
  balance = 0;
  balanceSubscription : Subscription;
  addLimitSubscription : Subscription;
  sendLimitSubscription : Subscription;
  private customer_id = null;
  private percentage =  null;
  customer_name = "";
  customer_email = "";
  customer_phone_no = "";
  addLimit = 0;
  addpercentage = 0;
  sendLimit = 0;
  sendpercentage = 0 ;

  constructor(
    public balanceService: BalanceService,
    public customerIdService: CustomerIdService,
    public walletService: WalletService
    ) { this.balanceSubscription = this.balanceService.getBalance()
        .subscribe(balance => {
          this.balance = balance; 
          this.percentage = (this.balance/25000)*100;
        });

        this.addLimitSubscription = this.balanceService.getAddLimit()
        .subscribe(addLimit =>{
          this.addLimit = addLimit;
          this.addpercentage  = (this.addLimit/10000)*100;
        }); 

        this.sendLimitSubscription = this.balanceService.getSendLimit()
        .subscribe(sendLimit =>{
          this.sendLimit = sendLimit;
          this.sendpercentage = (this.sendLimit/10000)*100;
        });
      }

  callBalance() {
    console.log(this.customer_id);
    this.walletService.fetchBalance(this.customer_id)
      .subscribe(data => this.setBalance(data)
    );
    
  }


  setBalance(data) {
    this.balanceService.updateBalance(data.wallet_amount);
    this.balance = data.wallet_amount;
    this.addLimit = data.todays_wallet_limit;
    this.sendLimit  = data.send_limit;
    this.percentage = (this.balance/25000)*100;
    this.addpercentage  = (this.addLimit/10000)*100;
    this.sendpercentage = (this.sendLimit/10000)*100;
  }

   
  ngOnInit() {
     this.balance = this.customerIdService.getBalance();
     this.addLimit = this.customerIdService.getAddLimit();
     this.sendLimit = this.customerIdService.getSendLimit();
     this.addpercentage = (this.addLimit/10000)*100;
     this.sendpercentage = (this.sendLimit/10000)*100;
     this.percentage = (this.balance/25000)*100;
     this.customer_id = this.customerIdService.getUser();
     this.customer_email = this.customerIdService.getEmail();
     this.customer_name = this.customerIdService.getUserName();
     this.customer_phone_no = this.customerIdService.getPhone();
  }
  
  ngOnDestroy() {
      this.balanceSubscription.unsubscribe();
      this.addLimitSubscription.unsubscribe();
      this.sendLimitSubscription.unsubscribe();
  }


}
