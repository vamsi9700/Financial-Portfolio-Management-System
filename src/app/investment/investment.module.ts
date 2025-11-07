import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentRoutingModule } from './investment-routing.module';
import { InvestmentComponent } from './investment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ReviewComponent } from './review/review.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [InvestmentComponent, ReviewComponent],
  imports: [
    CommonModule,
    InvestmentRoutingModule,
    ReactiveFormsModule,
    MaterialModule,ToastrModule.forRoot({
          timeOut: 3000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
          progressBar: true,
        })
  ]
})
export class InvestmentModule { }
