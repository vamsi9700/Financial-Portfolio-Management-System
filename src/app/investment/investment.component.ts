import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReviewComponent } from './review/review.component';
import { Investment, InvestmentService } from '../service/investment.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.scss']
})
export class InvestmentComponent {
investmentForm: FormGroup;
investments: Investment[] = [];
  assetTypes = ['Stocks', 'Mutual Funds', 'Real Estate', 'Gold', 'Crypto'];
displayedColumns: string[] = ['id', 'assetType', 'quantity', 'purchasePrice', 'purchaseDate'];
  constructor(private fb: FormBuilder, private dialog: MatDialog,private investmentService:InvestmentService,
    private toastr: ToastrService
  ) {
    this.investmentForm = this.fb.group({
      assetType: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)]],
      purchasePrice: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      purchaseDate: ['', Validators.required]
    });
  }

  reviewForm() {
    if (this.investmentForm.valid) {
      this.dialog.open(ReviewComponent, {
        data: this.investmentForm.value,
        width: '400px',
      });
    } else {
      this.investmentForm.markAllAsTouched();
    }
  }
  cancelForm(){
    this.investmentForm.reset();
  }

  submitForm() {
    if (this.investmentForm.valid) {
      const investmentData = this.investmentForm.value;
      this.investmentService.createInvestment(investmentData).subscribe({
        next: (response) => {
          debugger;
          this.toastr.success('Investment saved successfully. See all investments for below table.');
          this.investmentForm.reset();
          this.loadInvestments();
        },
        error: (err) => {
         this.toastr.error('Failed to add investment.')
        }
      });
      this.investmentForm.reset();
    } else {
      this.toastr.warning('Please fill in all required fields correctly!');
      this.investmentForm.markAllAsTouched();
    }
  }
  loadInvestments() {
    debugger;
    this.investmentService.getInvestments().subscribe((data) => {
      this.investments = [...data];
    });
  }
}