import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { TopNavComponent } from './views/components/top-nav/top-nav.component'
import { EWalletComponent } from './views/pages/e-wallet/e-wallet.component';
import { ProfileComponent } from './views/pages/e-wallet/profile/profile.component';
import { TransactionComponent } from './views/pages/e-wallet/transaction/transaction.component';
import { AddMoneyComponent } from './views/pages/add-money/add-money.component';
import { RequestMoneyComponent } from './views/pages/request-money/request-money.component';
import { SendMoneyComponent } from './views/pages/send-money/send-money.component';
import { NotificationComponent } from './views/pages/notification/notification.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';

 const routes: Routes = [
   
  { path:'',redirectTo:'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent,
    children: [
         {
            path: '',
            outlet:'actionRoutes',
            component: TransactionComponent
        },
        {
            path: 'send-money',
            outlet:'actionRoutes',
            component: SendMoneyComponent
        },  
        {
            path: 'add-money',
            outlet:'actionRoutes',
            component: AddMoneyComponent
        },
        {
          path: 'request-money',
          outlet:'actionRoutes',
          component: RequestMoneyComponent
        }              
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

// export const routes: ModuleWithProviders = RouterModule.forRoot(router);

export class AppRoutingModule { }