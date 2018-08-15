import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'mm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.sass']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  dollar: Number;
  euro: Number;

  constructor() { }

  ngOnInit() {
    const {rates} = this.currency;
    this.dollar = Math.round(rates['USD'] * this.bill.value);
    this.euro = Math.round(rates['EUR'] * this.bill.value);
  }
}
