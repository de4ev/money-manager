import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { MMEvent } from '../../shared/models/event.model';

@Component({
  selector: 'mm-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.sass']
})
export class HistoryEventsComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() events: MMEvent[] = [];

  searchValue='';
  searchPlaceholder='Amount';
  searchField='amount'

  constructor() { }

  ngOnInit() {
    this.events.forEach( e => {
      e.catName = this.categories.find( c => c.id === e.category).name
      })
    }
    getEventClass(e) {
      return {
        'label': true,
        'label-danger': e.type === 'expenditure',
        'label-success': e.type === 'income',
      }
    }
    changeCriteria(field: string) {
      const namesMap = {
        amount: 'Amount',
        date: 'Date',
        category: 'Category',
        type: 'Type'
      }
      this.searchPlaceholder = namesMap[field]
      this.searchField = field;
    }
  }

