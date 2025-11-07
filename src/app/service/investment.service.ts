import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
export interface Investment {
  assetType: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
}
@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  private investments: Investment[] = [];
  constructor() { }
  createInvestment(investment: Investment): Observable<Investment> {
    debugger;
    // Fake ID and save to local array
    const newInvestment = { ...investment, id: this.investments.length + 1 };
    this.investments.push(newInvestment);

    console.log('Mock created investment:', newInvestment);
    // Return observable just like HttpClient.post() would
    return of(newInvestment);
  }
  getInvestments(): Observable<Investment[]> {
    return of(this.investments);
  }
}
