import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.css']
})
export class EventBookingComponent implements OnInit {
  bookingForm: FormGroup;
  submit: boolean;
  available_seats: number;
  seats_selected: number;
  numbers_of_attendees: Array<number>;

  constructor() { }

  ngOnInit() {
    this.submit = false;
    this.numbers_of_attendees = [];
  }

  initForm(): void {
    this.bookingForm = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.pattern('^[0-9]{10}$')]),
      seats: new FormControl(null, [Validators.required, seatsValidator(this.available_seats)]),
      other: new FormControl(null, [Validators.required])
    });
  }

  recieveEvent($event): void {
    this.available_seats = $event;
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.bookingForm.controls; }

  onSubmit(): void {
    this.submit = true;
    // stop here if form is invalid
    if (this.bookingForm.invalid) {
      return;
    }
  }

  changeAttendees($event): void {
    this.numbers_of_attendees = [];
    for(let i = 1; i<=this.seats_selected; i++) {
      this.numbers_of_attendees.push(i+1);
    }
  }
}

//custom validation
export function seatsValidator(seats: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== undefined && (isNaN(control.value) || control.value > seats)) {
      return { 'seatsAvailability': true };
    }
    return null;
  };
}
