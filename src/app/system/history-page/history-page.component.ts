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
  isLoaded= false;
  chartData= [];

  ngOnInit() {
    this.sub1 = combineLatest(
      this.categoriesService.getCategories(),
      this.eventService.getEventsByType('expenditures')
    ).subscribe((data: [Category[], MMEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];
    })
    this.isLoaded = true;
    this.calculateChartData()
  }

  calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach((c) => {
      const categoryEvents = this.events.filter((c) => c.category === c.id)
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
