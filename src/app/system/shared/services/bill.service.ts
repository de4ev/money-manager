import { Injectable } from '../../../../../node_modules/@angular/core';
import { Http, Response } from '../../../../../node_modules/@angular/http';
import { Observable } from '../../../../../node_modules/rxjs';
import { Bill } from '../models/bill.model';
import { map } from '../../../../../node_modules/rxjs/operators';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable ()
export class BillService extends BaseApi {
    constructor(
        public http: Http
    ) {
        super(http);
    }
    getBill(): Observable<Bill> {
        return this.get('bill');
    }
    getCurrency(base: string = 'RUB'): Observable<any> {
        return this.http.get(`https://exchangeratesapi.io/api/latest?base=${base}`)
        .pipe(map((response: Response) => response.json()));
    }
}
