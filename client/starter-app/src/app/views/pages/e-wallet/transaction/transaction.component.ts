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
  show=true;
  len = null;

  constructor(
    private historyService: HistoryService,
    private customerIdService: CustomerIdService) { }
    

  loadTransaction() {
      this.historyService.getTransactions(this.customer_id)
        .then(data => this.reverse(data.senderTrans));
    }

  reverse(data) {
    this.History = data.reverse();
    console.log(this.History);
    this.len = this.History.length;
    if(this.len===0){
      this.show = false;
    }
    console.log(this.len);
  }


  ngOnInit() {
    this.customer_id = this.customerIdService.getUser();
    this.loadTransaction();
  }

}
