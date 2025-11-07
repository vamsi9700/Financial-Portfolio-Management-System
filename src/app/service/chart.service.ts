import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
export interface AllocationItem {
  assetType: string;
  percentage: number;
  value: number;
}

export interface PerformancePoint {
  date: string; // ISO date string
  portfolioValue: number;
  benchmarkValue?: number;
}
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() { }
   private allocation: AllocationItem[] = [
    { assetType: 'Stocks', percentage: 55, value: 55000 },
    { assetType: 'Bonds', percentage: 20, value: 20000 },
    { assetType: 'Mutual Funds', percentage: 15, value: 15000 },
    { assetType: 'Gold', percentage: 7, value: 7000 },
    { assetType: 'Cash', percentage: 3, value: 3000 }
  ];
  private performance: PerformancePoint[] = [
    { date: '2025-01-01', portfolioValue: 90000, benchmarkValue: 88000 },
    { date: '2025-02-01', portfolioValue: 92000, benchmarkValue: 89000 },
    { date: '2025-03-01', portfolioValue: 95000, benchmarkValue: 93000 },
    { date: '2025-04-01', portfolioValue: 93000, benchmarkValue: 94000 },
    { date: '2025-05-01', portfolioValue: 98000, benchmarkValue: 96000 },
    { date: '2025-06-01', portfolioValue: 102000, benchmarkValue: 100000 },
    { date: '2025-07-01', portfolioValue: 107000, benchmarkValue: 103000 },
    { date: '2025-08-01', portfolioValue: 110000, benchmarkValue: 108000 },
    { date: '2025-09-01', portfolioValue: 115000, benchmarkValue: 112000 },
    { date: '2025-10-01', portfolioValue: 120000, benchmarkValue: 116000 },
    { date: '2025-11-01', portfolioValue: 125000, benchmarkValue: 120000 }
  ];

  getAllocation(): Observable<AllocationItem[]> {
    return of(this.allocation);
  }

  getPerformance(): Observable<PerformancePoint[]> {
    return of(this.performance);
  }
}
