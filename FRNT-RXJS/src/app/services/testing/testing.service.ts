import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
// инжиктировали в app
export class ObservableExampleService {
private myBehaviorSubject = new BehaviorSubject<string>('some data of Behavior subject');
private mySubject = new Subject<string>();
// отправка каждому подписчику и вызывается элемент каждого подписчика
private myObservable =new Observable((subscriber => {
  subscriber.next('sync someValue')
  setTimeout(() => {
    subscriber.next('someValue')
  }, 3000)
}))
  constructor() { }

  initObservable(): void{
    //Как подпишемся на наблюдаемый объект, отправятся значения и ассинхроно отправится string и объект с ошибкой
    const observable = new Observable((subscriber => {
      subscriber.next(4);
      subscriber.next(5);
      setTimeout(() =>{
        subscriber.next('asyncData');
        subscriber.error('err');
      }, 3000)
    }))

      //формируем подписку
    const sub = observable.subscribe((data) => {
      console.log('observable data', data)
    }, (error => {
      console.log('error', error)
    }))
    sub.unsubscribe() // удаляет объект (data и err) из массива наблюдаемого объекта (асинхронная операция не вызвана)
  }
  getObservable(): Observable<string> {
    // @ts-ignore
    return this.myObservable;
  }

  getSubject(): Subject<string> {
    return this.mySubject;
  }
  getBehaviorSubject(): BehaviorSubject <string>{
    return this.myBehaviorSubject;
  }

  subscribe(param: (data: string) => void) {
    return undefined;
  }
}
