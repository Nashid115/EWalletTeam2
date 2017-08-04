import { Component, OnInit, OnDestroy } from '@angular/core';
import { BalanceService} from '../../../balance.service';
import { Subscription } from 'rxjs/Subscription';
import { CustomerIdService } from '../../../customer-id.service';
import { WalletService } from './wallet.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  balance : any;
  subscription : Subscription;
  private customer_id = null;

  constructor(
    public balanceService: BalanceService,
    public customerIdService: CustomerIdService,
    public walletService: WalletService
    ) { this.subscription = this.balanceService.getBalance().subscribe(balance => this.balance = balance);}

  callBalance() {
    this.walletService.fetchBalance(this.customer_id)
      .then(data => this.setBalance(data));
  }

  setBalance(data) {
    this.balance = data.wallet_amount;
  }

  ngOnInit() {
     this.balance = this.customerIdService.getBalance();
     this.customer_id = this.customerIdService.getUser();
  }
  
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }


}