import { Component, OnChanges } from '@angular/core';
import { AllocationItem, ChartService, PerformancePoint } from '../service/chart.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnChanges {
  summaryData = [
    { metric: 'Total Portfolio' },
    { metric: 'Allocation Count' }
  ];
  allocDisplayedColumns: string[] = ['assetType', 'percentage', 'value'];
  summaryDisplayedColumns: string[] = ['metric', 'value'];
  recentPerformance: any[] = [];
  displayedColumns: string[] = ['date', 'portfolioValue'];
  allocation: AllocationItem[] = [];
  performance: PerformancePoint[] = [];
  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Allocation' }]
  };
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 14,
          padding: 10,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: { enabled: true },
    },
    layout: {
      padding: 10,
    },
  };
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Portfolio', fill: true, tension: 0.3, pointRadius: 3 },
      { data: [], label: 'Benchmark', fill: false, tension: 0.3, borderDash: [6, 4], pointRadius: 2 }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'bottom', labels: {
          boxWidth: 14,
          padding: 10,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: { enabled: true }
    },
    scales: {
      x: { display: true, title: { display: true, text: 'Date' }, grid: { color: '#e5e7eb' } },
      y: { display: true, title: { display: true, text: 'Value (INR)' }, grid: { color: '#e5e7eb' } }
    }
  };
  showBenchmark = true;
  selectedRange: 'all' | '6m' | '1y' = 'all';
  constructor(private svc: ChartService) { }
  ngOnInit(): void {
    this.loadAllocation();
    this.loadPerformance();
  }

  loadAllocation() {
    this.svc.getAllocation().subscribe(data => {
      this.allocation = data;
      this.doughnutChartData.labels = data.map(d => d.assetType);
      this.doughnutChartData.datasets = [
        { data: data.map(d => d.percentage), label: 'Allocation' }
      ];
    });
  }

  loadPerformance() {
    this.svc.getPerformance().subscribe(data => {
      this.performance = data;
      this.recentPerformance = this.performance.slice(-6);
      this.updateDisplayedColumns();
      this.updateLineChartData();
    });
  }
  ngOnChanges() {
    this.updateDisplayedColumns();
  }

  updateDisplayedColumns() {
    this.displayedColumns = this.showBenchmark
      ? ['date', 'portfolioValue', 'benchmarkValue']
      : ['date', 'portfolioValue'];
  }

  updateLineChartData() {
    const points = this.filterByRange(this.performance, this.selectedRange);
    this.lineChartData.labels = points.map(p => new Date(p.date).toLocaleDateString());
    this.lineChartData.datasets = [
      {
        ...this.lineChartData.datasets[0],
        data: points.map(p => p.portfolioValue)
      },
      {
        ...this.lineChartData.datasets[1],
        data: this.showBenchmark
          ? points.map(p => p.benchmarkValue ?? 0)
          : []
      }
    ];
    this.lineChartData = { ...this.lineChartData };
  }

  toggleBenchmark(event: any) {
    this.showBenchmark = event.checked;
    this.updateLineChartData();
    this.updateDisplayedColumns();
  }

  changeRange(range: 'all' | '6m' | '1y') {
    this.selectedRange = range;
    this.updateLineChartData();
  }

  private filterByRange(data: PerformancePoint[], range: 'all' | '6m' | '1y'): PerformancePoint[] {
    if (range === 'all') return data;
    const months = range === '6m' ? 6 : 12;
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);
    return data.filter(p => new Date(p.date) >= cutoff);
  }

  totalPortfolioValue(): number {
    return this.allocation.reduce((s, a) => s + (a.value || 0), 0);
  }
}
