import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICustomTicketData, INearestTour, ITour, ITourLocation } from '../../../models/tours';
import { ActivatedRoute } from '@angular/router';
import { TicketsStorageService } from '../../../services/tiсkets-storage/tiсkets-storage.service';
import { IUser } from '../../../models/users';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { forkJoin, fromEvent, Subscription } from 'rxjs';
import { TicketService } from '../../../services/tickets/ticket.service';
import { IOrder } from '../../../models/order';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  ticket: ITour | undefined;
  user: IUser | null;
  userForm: FormGroup;

  nearestTours: ICustomTicketData[];
  tourLocation: ITourLocation[];
  ticketSearchValue: string;
  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  searchTypes = [1, 2, 3]

  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  constructor(private route: ActivatedRoute,
              private ticketStorage: TicketsStorageService,
              private userService: UserService,
              private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(this.user?.cardNumber),
      birthDay: new FormControl(''),
      age: new FormControl(),
      citizen: new FormControl('')
    });

    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) => {
      this.tourLocation = data[1];
      this.nearestTours = this.ticketService.transformData(data[0], data[1]);
    })

    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIDParam = this.route.snapshot.queryParamMap.get('id');
    const paramValueId = routeIdParam || queryIDParam;

    if (paramValueId) {
      this.ticketService.getTicketById(paramValueId).subscribe((data: ITour) => {
        this.ticket = data;
      })
    }
  }

  ngAfterViewInit(): void {
    //setCardNumber
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);

    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup')
    this.searchTicketSub = fromEventObserver.subscribe((ev: any) => {
      this.initSearchTour();
    })
  }

  ngOnDestroy(): void {
    this.searchTicketSub.unsubscribe();
  }

  initSearchTour(): void {
    const type = Math.floor(Math.random() * this.searchTypes.length);
    if (this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe();
    }
    this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data) => {
      this.nearestTours = this.ticketService.transformData([data], this.tourLocation)
    })
  }

  onSubmit(): void {

  }

  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};
    this.ticketService.sendTourData(postData).subscribe();

    const userId = this.userService.getUser()?.id || null;
    const postObj: IOrder = {
      age: postData.age,
      birthDay: postData.birthDay,
      cardNumber: postData.cardNumber,
      tourId: postData._id,
      userId: userId,
    }
    this.ticketService.sendTourData(postObj).subscribe();
  }

  selectDate(ev: Event): void {

  }
}
