import { Component, OnInit } from '@angular/core';
import { CustomerIdService } from '../../../customer-id.service';
import { HistoryService } from '../../pages/e-wallet/transaction/history.service';
import { TransactionComponent } from '../../pages/e-wallet/transaction/transaction.component';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  private userName = "";
  private balance = null;
  private history : any;
  private customer_id: null;
  length :any;
  requestLength: any;

  constructor(
    private customerIdService: CustomerIdService,
    private historyService: HistoryService,
    private notificationService: NotificationService) { }
  
  logout(){
    this.customerIdService.clearUser();
  }

  loadNotification() {
      this.notificationService.getNotification(this.customer_id)
        .then(data => this.reverse(data.notification));
    }

  reverse(data) {
    this.history = data.reverse();
    this.length= this.history.length;
  }

  ngOnInit() {
    this.requestLength = 0;
    this.userName = this.customerIdService.getUserName();
    this.balance = this.customerIdService.getBalance();
    this.customer_id = this.customerIdService.getUser();
    this.loadNotification();
  }

}
