import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
   { path: '', component: LoginComponent },
  // {
  //   path: '',
  //   redirectTo: 'dashboard',   // 👈 default route
  //   pathMatch: 'full'
  // },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'investment',
    loadChildren: () =>
      import('./investment/investment.module').then(m => m.InvestmentModule)
  },
  // {
  //   path: '**',
  //   redirectTo: 'dashboard'  // 👈 wildcard fallback
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
