import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../../../shared/core/base-api';
import { MMEvent } from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {

    constructor(
        public http: Http
    ) {
        super(http);
    }

    addEvent(event: MMEvent): Observable<MMEvent> {
        return this.post('events', event);
    }
    getEvents(): Observable<MMEvent[]> {
        return this.get('events');
    }
    getEventById(id: string): Observable<MMEvent> {
        return this.get(`events/${id}`);
    }
    getEventsByType(type: string): Observable<MMEvent[]> {
        return this.get(`events?type=${type}`);
    }
}
