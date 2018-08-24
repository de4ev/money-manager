import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { MMEvent } from '../shared/models/event.model';
import { Bill } from '../shared/models/bill.model';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'mm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.sass']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: MMEvent[] = [];

  constructor(
    private billService: BillService,
    private categoryService: CategoriesService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.categoryService.getCategories(),
      this.eventsService.getEventsByType('expenditure')      
    ).subscribe((data: [Bill, Category[], MMEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      
      this.isLoaded = true;
    })
  }

  getCategoryExpenditures(category: Category): number {
    const categoryEvents = this.events.filter((c) => c.category === category.id)
    return categoryEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0)
  }

  private getPercent(category: Category): number {
    const percent = (100 * this.getCategoryExpenditures(category))/category.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCategoryPercent(category: Category): string {
    return this.getPercent(category)+'%';
  }

  getCategoryColorClass(category: Category): string {
    const percent = this.getPercent(category);
    return percent >= 100 ? 'danger' : percent < 60 ? 'success' : 'warning';
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe;
    }
  }
}
