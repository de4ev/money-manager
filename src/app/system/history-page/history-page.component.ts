import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { MMEvent } from '../shared/models/event.model';

@Component({
  selector: 'mm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.sass']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  constructor(
    private categoriesService: CategoriesService,
    private eventService: EventsService
  ) { }

  categories: Category[] = [];
  events: MMEvent[] = [];
  expEvents: MMEvent[] = [];
  isLoaded= false;
  chartData= [];

  ngOnInit() {
    this.sub1 = combineLatest(
      this.categoriesService.getCategories(),
      this.eventService.getEventsByType('expenditure'),
      this.eventService.getEvents()
    ).subscribe((data: [Category[], MMEvent[], MMEvent[]]) => {
      this.categories = data[0];
      this.expEvents = data[1];
      this.events = data[2];
      
      this.calculateChartData();
      this.isLoaded = true;
    })
  }

  calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach((c) => {
      const categoryEvents = this.expEvents.filter((cat) => cat.category === c.id);
      this.chartData.push({
        name: c.name,
        value: categoryEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      })
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe()
    }
  }
} 
