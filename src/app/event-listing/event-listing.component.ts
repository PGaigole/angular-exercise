import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Events } from '../../classes/events';
import { EventInfo } from '../../classes/event-info';

import { EventListingService } from '../../services/event-listing.service';
import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.css']
})
export class EventListingComponent implements OnInit {
  searchedText: string;
  events: Events;
  share_to_event_header: any;
  keepOriginalOrder = (a, b) => b.key;

  constructor(
    private eventListingService: EventListingService,
    private dataShareService: DataShareService,
    private router: Router
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

  bookEvent(selected_event): void {
    this.dataShareService.changeData({data: {name: selected_event.name, seats_available: selected_event.seats_available}});
    this.dataShareService.current_data.subscribe(share_data => this.share_to_event_header = share_data);
    this.router.navigate(['book']);
  }

}
