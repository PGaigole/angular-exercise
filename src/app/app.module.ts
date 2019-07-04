import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { EventListingComponent } from './event-listing/event-listing.component';
import { SearchPipe } from './pipes/search.pipe';
import { EventBookingComponent } from './event-booking/event-booking.component';
import { EventHeaderComponent } from './event-header/event-header.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    EventListingComponent,
    SearchPipe,
    EventBookingComponent,
    EventHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
