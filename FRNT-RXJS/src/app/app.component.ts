import { Component, OnInit } from '@angular/core';
import { ObservableExampleService } from './services/testing/testing.service';
import { ConfigService } from './services/config-service/config-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ticketSales2022';
  prop: string;

  constructor(private testing: ObservableExampleService, private configService: ConfigService) {
    testing.initObservable();
  }

  ngOnInit() {
    this.configService.configLoad()

    //Observable
    //first subscriber
    const myObservable = this.testing.getObservable();
    myObservable.subscribe((data) => {
    })
    //second subscriber
    myObservable.subscribe((data) => {
    });

    //Subject
    const mySubject = this.testing.getSubject();

    mySubject.next('subject value');

    //Behavior Subject
    const myBehavior = this.testing.getBehaviorSubject();
    myBehavior.next('new data from behaviorSubject');
    myBehavior.subscribe((data) => {
    });
  }
}
