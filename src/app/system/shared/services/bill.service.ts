import { Injectable } from '../../../../../node_modules/@angular/core';
import { Http, Response } from '../../../../../node_modules/@angular/http';
import { Observable } from '../../../../../node_modules/rxjs';
import { Bill } from '../models/bill.model';
import { map } from '../../../../../node_modules/rxjs/operators';

@Injectable ()
export class BillService {
    constructor(
        private http: Http
    ) {}
    getBill(): Observable<Bill> {
        return this.http.get('http://localhost:3000/bill')
        .pipe(map((response: Response) => response.json()));
    }
    getCurrency(base: string = 'RUB'): Observable<any> {
        return this.http.get(`https://exchangeratesapi.io/api/latest?base=${base}`)
        .pipe(map((response: Response) => response.json()));
    }
}
