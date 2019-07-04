import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.css']
})
export class EventHeaderComponent implements OnInit {
  shared_data_from_event_listing: any;
  @Output() share_seats = new EventEmitter<number>();

  constructor(
    private dataShareService: DataShareService
  ) { }

  ngOnInit() {
    this.dataShareService.current_data.subscribe(share_data => this.shared_data_from_event_listing = share_data);
    this.share_seats.emit(this.shared_data_from_event_listing.data.seats_available);
  }

}
