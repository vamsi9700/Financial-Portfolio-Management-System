import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private _dataSubject = new Subject<any>();
  data$ = this._dataSubject.asObservable();
  constructor() { }
  sendData(data: any) {
    debugger;
    this._dataSubject.next(data);
  }
}
