import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/pages/login/login.component';
// import { RegisterComponent } from './views/pages/register/register.component';
import {TopNavComponent} from './views/components/top-nav/top-nav.component'
import { EWalletComponent } from './views/pages/e-wallet/e-wallet.component';
import { ProfileComponent } from './views/pages/e-wallet/profile/profile.component';
import { TransactionComponent } from './views/pages/e-wallet/transaction/transaction.component';
import { AddMoneyComponent } from './views/pages/add-money/add-money.component';
import { RequestMoneyComponent } from './views/pages/request-money/request-money.component';
import { SendMoneyComponent } from './views/pages/send-money/send-money.component';
import { NotificationComponent } from './views/pages/notification/notification.component';
// import { TopNavComponent } from './views/components/top-nav/top-nav.component';

 const routes: Routes = [
  // {
    // { path: '', redirectTo: 'about', pathMatch: 'full' }
    // children: []
  // }
  // {
          // path: 'e', component: TopNavComponent, children: [
            // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    // { path: '', redirectTo: 'ewallet', pathMatch: 'full' },
    // { path: '', component: TopNavComponent},
    { path: '', component: EWalletComponent },    
    { path: 'addMoney', component: AddMoneyComponent },
    { path: 'requestMoney', component: RequestMoneyComponent },
    { path: 'sendMoney', component: SendMoneyComponent },
    { path: 'notification', component: NotificationComponent }
          ]
  // }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

// export const routes: ModuleWithProviders = RouterModule.forRoot(router);

export class AppRoutingModule { }
