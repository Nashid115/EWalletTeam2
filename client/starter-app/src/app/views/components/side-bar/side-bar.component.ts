import { Component, OnInit, OnDestroy } from '@angular/core';
import { BalanceService} from '../../../balance.service';
import { Subscription } from 'rxjs/Subscription';
import { CustomerIdService } from '../../../customer-id.service';
import { ProgressbarModule } from 'ngx-bootstrap';
import { SideBarService } from './side-bar.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  responsedata : any ={};
  balance : any;
  subscription : Subscription;

  constructor(
    private sideBarService : SideBarService,
    public balanceService: BalanceService,
    public customerIdService: CustomerIdService
    ) { this.subscription = this.balanceService.getBalance().subscribe(balance => this.balance = balance);}

   
    

  ngOnInit() {
     this.balance = this.customerIdService.getBalance()
      
      this.sideBarService.getprogress_response()
      .subscribe(data => {this.responsedata=(data)
    console.log(this.responsedata.value,"gjh")},
    err => console.log(err.status)
  )
  }
  
  ngOnDestroy() {
        this.subscription.unsubscribe();
  }


}
