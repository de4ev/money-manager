import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment'

import { Category } from '../../shared/models/category.model';
import { MMEvent } from '../../shared/models/event.model';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { mergeMap } from 'rxjs/operators';
import { Message } from '../../../shared/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.sass']
})
export class AddEventComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;

  @Input() categories: Category[] = [];
  types= [
    {type: 'income', label: 'Income'},
    {type: 'expenditure', label: 'Expenditure'}
  ]

  message: Message;

  constructor(
    private eventsService: EventsService,
    private billService: BillService
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private ShowMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000)
  }

  onSubmit(form: NgForm) {
    let { amount, category, type, description } = form.value;
    if (amount < 0) amount *= -1;

    const event = new MMEvent(
      type, 
      amount, 
      +category,
      moment().format('DD.MM.YYYY HH:mm:ss'), 
      description
    );

    this.sub1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if (type === 'expenditure') {
          if (amount > bill.value) {
            this.ShowMessage("You don't have enough funds.")
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }

        this.sub2 = this.billService.updateBill({value, currency: bill.currency})
          .pipe(mergeMap(() => this.eventsService.addEvent(event)))
          .subscribe( () => {
            form.setValue({
              amount: 0,
              description: ' ',
              category: 1,
              type: 'expenditure'}
            )
          });
      });
  }
  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
    if (this.sub2) this.sub2.unsubscribe();
   }
}
