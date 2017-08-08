import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { EWalletComponent } from './views/pages/e-wallet/e-wallet.component';
import { ProfileComponent } from './views/pages/e-wallet/profile/profile.component';
import { TransactionComponent } from './views/pages/e-wallet/transaction/transaction.component';
import { AddMoneyComponent } from './views/pages/add-money/add-money.component';
import { RequestMoneyComponent } from './views/pages/request-money/request-money.component';
import { SendMoneyComponent } from './views/pages/send-money/send-money.component';
import { NotificationComponent } from './views/pages/notification/notification.component';
import { TopNavComponent } from './views/components/top-nav/top-nav.component';
import { HistoryService } from './views/pages/e-wallet/transaction/history.service';
import { NavTabsComponent } from './views/components/nav-tabs/nav-tabs.component';
import { SideBarComponent } from './views/components/side-bar/side-bar.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { RequestMoneyService } from './views/pages/request-money/request-money.service';
import { AddMoneyService } from './views/pages/add-money/add-money.service';
import { BalanceService } from './balance.service';
import { RegisterService } from './views/pages/register/register.service';
import { LoginService } from './views/pages/login/login.service';
import { SendMoneyService } from './views/pages/send-money/send-money.service';
import { CustomerIdService} from './customer-id.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { WalletService } from './views/components/side-bar/wallet.service';
import { ProgressbarModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EWalletComponent,
    ProfileComponent,
    TransactionComponent,
    AddMoneyComponent,
    RequestMoneyComponent,
    SendMoneyComponent,
    NotificationComponent,
    TopNavComponent,
    NavTabsComponent,
    SideBarComponent,
    DashboardComponent
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ProgressbarModule.forRoot()
  ],
  providers: [
    HistoryService,
    RegisterService,
    LoginService,
    RequestMoneyService,
    AddMoneyService,
    BalanceService,
    SendMoneyService,
    CustomerIdService,
    WalletService,
  ],
 bootstrap: [AppComponent]
})
export class AppModule { }
