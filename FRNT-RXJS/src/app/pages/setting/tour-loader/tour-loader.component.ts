import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../../services/tickets/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-loader',
  templateUrl: './tour-loader.component.html',
  styleUrls: ['./tour-loader.component.scss']
})
export class TourLoaderComponent implements OnInit {
  tourForm: FormGroup;

  constructor(private ticketService: TicketService,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.tourForm = new FormGroup({
      name: new FormControl('', {validators: Validators.required}),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      operator: new FormControl(),
      price: new FormControl(),
      img: new FormControl(),
    });
  }

  createTour(): void {
    const tourDataRow = this.tourForm.getRawValue();
    let formParams = new FormData();

    if (typeof tourDataRow === "object") {
      for (let prop in tourDataRow) {
        formParams.append(prop, tourDataRow[prop]);
      }
    }
    this.ticketService.createTour(formParams).subscribe(() => {
      this.router.navigate(['tickets/tickets-list']);
    })

  }

  selectFile(evt: any): void {
    if (evt.target.files.length > 0) {
      const file = evt.target.files[0];
      this.tourForm.patchValue({
        img: file,
      })
    }
  }
}
