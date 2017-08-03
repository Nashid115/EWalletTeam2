import { Component, OnInit } from '@angular/core';
import {CustomerIdService} from '../../../customer-id.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  userName = "";
  balance = null;
  constructor( private customerIdService: CustomerIdService) { }
  logout(){
    this.customerIdService.clearUser();
  }

  ngOnInit() {
    this.userName = this.customerIdService.getUserName();
    this.balance = this.customerIdService.getBalance();
  }

}
