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
  subscription: Subscription;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.subscription = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
      console.log(data);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
