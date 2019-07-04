import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.css']
})
export class EventBookingComponent implements OnInit {
  bookingForm: FormGroup;
  error: boolean;
  submit: boolean;
  available_seats: number;
  seats_selected: number;
  numbers_of_attendees: Array<number>;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.error = false;
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
    // stop here if form is invalid
    if (this.bookingForm.invalid) {
      this.error = true;
      this.submit = false;
      return;
    }
    else {
      this.submit = true;
    }
  }

  changeAttendees($event): void {
    this.numbers_of_attendees = [];
    for(let i = 1; i<=this.seats_selected; i++) {
      this.numbers_of_attendees.push(i+1);
    }
    // this.bookingForm.valueChanges.subscribe( () =>{
    //     this.changeForm();
    //  })
  }

  // changeForm(): void {
  //   for (let day of this.numbers_of_attendees) {
  //     console.log(day);
  //     let control = new FormControl(day, [Validators.required]);
  //     console.log(day);
  //     console.log(control);
  //     this.bookingForm.addControl('', control);
  //   }
  //   console.log(this.bookingForm);
  // }

  goToEventListing(): void {
    this.router.navigate(['events']);
  }
}

//custom validation for seats
export function seatsValidator(seats: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== undefined && (isNaN(control.value) || control.value > seats)) {
      return { 'seatsAvailability': true };
    }
    return null;
  };
}
