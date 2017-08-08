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
  get_add_data : any;
  addpercentage = null;
  get_send_data :any;
  sendpercentage =null ;

  constructor(
    public balanceService: BalanceService,
    public customerIdService: CustomerIdService,
    public walletService: WalletService
    ) { this.subscription = this.balanceService.getBalance().subscribe(balance => this.balance = balance);}

  callBalance() {
    this.walletService.fetchBalance(this.customer_id)
      .subscribe(data => this.setBalance(data)
    );
    
  }


  setBalance(data) {
    this.balance = data.wallet_amount;
     this.get_add_data = data.todays_wallet_limit;
     this. get_send_data  = data.send_limit;
    this.percentage = (this.balance/25000)*100;
    this.addpercentage  = (this.get_add_data/10000)*100;
    this.sendpercentage = (this.get_send_data/10000)*100;
  }

   
  ngOnInit() {
     this.balance = this.customerIdService.getBalance();
     this.get_add_data = this.customerIdService.getAddLimit();
      this.get_send_data = this.customerIdService.getSendLimit();

     this.addpercentage = (this.get_add_data/10000)*100;
     this.sendpercentage = (this.get_send_data/10000)*100;
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
