import { Injectable } from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {map, Observable, Subject} from "rxjs";
import {ICustomTicketData, INearestTour, ITour, ITourLocation} from "../../models/tours"
import {ITourTypeSelect} from "../../models/tours";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private ticketServiceRest: TicketRestService, private http: HttpClient) { }

  private ticketSubject = new Subject<ITourTypeSelect>();

  //для удаления и формирования списка туров
  private ticketUpdateSubject = new Subject<ITour[]>();
  readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();


  // 1 вариант доступа к Observable
  readonly ticketType$ = this.ticketSubject.asObservable();

  // 2 вариант доступа к Observable
  // getTicketTypeObservable(): Observable<ITourTypeSelect> {
  //   return this.ticketSubject.asObservable();
  // }

  updateTicketList(data: ITour[]) {
    this.ticketUpdateSubject.next(data);
  }

 updateTour(type:ITourTypeSelect): void {
   this.ticketSubject.next(type);
  }


  //Вызывает метод ticketServiceRest
  getTickets(): Observable<ITour[]>{
   //возвращает Observable, добавляем одиночные туры (не 2, а 4)
    return this.ticketServiceRest.getTickets().pipe(map(
      //изменение данных полученные сервисом (преобразование данных)
      (value) => {
        const singleTour = value.filter((el) => el.type === "single")
        return value.concat(singleTour)
      }
    ));
  }
  //возвращает результат вызова getRestError
   getError(): Observable<any> {
    return this.ticketServiceRest.getRestError()
   }

   getNearestTours(): Observable<INearestTour[]>{
   return this.ticketServiceRest.getNearestTickets()
   }

   getToursLocation(): Observable<ITourLocation[]>{
   return this.ticketServiceRest.getLocationList()
}
//обращаемся к массиву регион, находим через id
   transformData (data: INearestTour[], regions: ITourLocation[]): ICustomTicketData[]{
     const newTicketData: ICustomTicketData[] = [];
     data.forEach((el) => {
       const newEl = <ICustomTicketData> {...el};
       newEl.region = <ICustomTicketData>regions.find((region) => el.locationId === region.id) || {};
       newTicketData.push(newEl);
     });
     return newTicketData;
   }
  getRandomNearestEvent(type: number): Observable<INearestTour>{
   return this.ticketServiceRest.getRandomNearestEvent(type);
  }
  sendTourData(data: any): Observable<any> {
    return this.ticketServiceRest.sendTourData(data);
  }

  createTour(body: any){
    return this.ticketServiceRest.createTour(body)
  }

  getTicketById(paramId: string): Observable<ITour>{
    return this.http.get<ITour>(`http://localhost:3000/tours/${paramId}`)
  }

  deleteTours(): Observable<any> {
    return this.http.delete("http://localhost:3000/tours/");
  }

  createTours(): Observable<ITour[]> {
    return this.http.post<ITour[]>("http://localhost:3000/tours/", '')
  }

  getAllTours(): Observable<ITour[]> {
  return this.http.get<ITour[]>("http://localhost:3000/tours/")
 }

}
