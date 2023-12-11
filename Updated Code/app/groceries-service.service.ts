import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as Rx from 'rxjs';
const { throwError } = Rx;




@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {

  items: any[] = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8080";

  constructor(public http: HttpClient) {
    console.log('Hello GroceriesService');
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/api/groceries`).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: any) {
    return res || {};
  }

  private handleError(error: any) {
    console.error('Error:', error);  // Log the complete error object
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return throwError(errMsg)
  }

  removeItem(index: number) {
    const updatedItems = [...this.items];
    updatedItems.splice(index, 1);
    this.items = updatedItems;
    this.notifyDataChanged();
  }

  addItem(item: any) {
    const updatedItems = [...this.items, item];
    this.items = updatedItems;
    this.notifyDataChanged();
  }

  editItem(item: any, index: number) {
    const updatedItems = [...this.items];
    updatedItems[index] = item;
    this.items = updatedItems;
    this.notifyDataChanged();
  }

  private notifyDataChanged() {
    this.dataChangeSubject.next(true);
  }
}
