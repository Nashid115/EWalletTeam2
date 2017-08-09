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
  customer_name = "";
  show=true;
  len = 0;
  p: number = 1;

  constructor(
    private historyService: HistoryService,
    private customerIdService: CustomerIdService) { }
    

  loadTransaction() {
      this.historyService.getTransactions(this.customer_id)
        .then(data => this.reverse(data.senderTrans));
    }

  reverse(data) {
    this.History = data.reverse();
    for(let i =0; i<this.History.length;i++){
      if(this.History[i].status !== 3){
        this.len++;
      }
    }
    if(this.len===0){
      this.show = false;
    }
  }

  ngOnInit() {
    this.customer_id = this.customerIdService.getUser();
    this.customer_name = this.customerIdService.getUserName();
    this.loadTransaction();
  }

}
