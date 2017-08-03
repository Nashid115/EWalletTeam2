import { Component, OnInit } from '@angular/core';
import { HistoryService } from './history.service';
import { CustomerIdService } from '../../../../customer-id.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})

export class TransactionComponent implements OnInit {

  History : any;
  customer_id = null;

  constructor(
    private historyService: HistoryService,
    private customerIdService: CustomerIdService) { }
    

  loadTransaction() {
      this.historyService.getTransactions(this.customer_id)
        .then(data => this.reverse(data.senderTrans));
    }

  reverse(data) {
    this.History = data.reverse();
  }


  ngOnInit() {
    this.customer_id = this.customerIdService.getUser();
    this.loadTransaction();
  }

}
