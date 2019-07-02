import { Component, OnInit } from '@angular/core';

import { Events } from '../../classes/events';
import { EventInfo } from '../../classes/event-info';

import { EventListingService } from '../../services/event-listing.service';

@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.css']
})
export class EventListingComponent implements OnInit {
  searchedText: string;
  events: Events;
  keepOriginalOrder = (a, b) => b.key;

  constructor(
    private eventListingService: EventListingService
  ) {
    this.events = new Events(new Array<EventInfo>());
  }

  ngOnInit() {
    this.searchedText = '';
    this.eventListingService.getEvents()
      .subscribe( data => {
        this.events = data;
      })
  }

  recieveEvent($event): void {
    this.searchedText = $event;
  }

}
