import { Component, OnInit, OnDestroy } from '@angular/core';

import { BillService } from '../shared/services/bill.service';
import { Observable, Subscription, combineLatest } from '../../../../node_modules/rxjs';
import { Bill } from '../shared/models/bill.model';

@Component({
  selector: 'mm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.sass']
})
export class BillPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;

  currency: any;
  bill: Bill;
  isLoaded = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }
  onRefresh() {
    this.isLoaded = false;
    this. sub2 = this.billService.getCurrency()
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
