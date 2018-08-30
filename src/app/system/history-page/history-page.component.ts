import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import * as moment from 'moment';

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
  filteredEvents: MMEvent[] = [];
  isLoaded= false;
  chartData= [];
  isFilterVisible = false;
  isFiltered = false;

  ngOnInit() {
    this.sub1 = combineLatest(
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Category[], MMEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];
      
      this.setOriginalEvents()
      this.calculateChartData();
      this.isLoaded = true;
    })
  }

  calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach((c) => {
      const categoryEvents = this.filteredEvents.filter((e) => e.category === c.id && e.type === 'expenditure');
      this.chartData.push({
        name: c.name,
        value: categoryEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      })
    });
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });
      this.isFiltered = true;
      this.calculateChartData();
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  onFilterReset() {
    this.setOriginalEvents();
    this.calculateChartData();
    this.isFiltered = false;
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
} 
