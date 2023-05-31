import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appBlockStyle]',
  host: {
    '(document:keyup)': 'initKeyUp($event)'
  },
  exportAs: 'blockStyle'
})
export class BlockStyleDirective implements OnInit, AfterViewInit, OnChanges {

  @Input() selector: string;
  @Input() initFirst: boolean = false;

  @Output() renderComplete = new EventEmitter();

  private items: HTMLElement[];
  private index: number = 0;
  public activeElementIndex: number;
  $event: KeyboardEvent;

  constructor(private el: ElementRef) {
  }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.activeElementIndex = 0;

    if (this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if (this.initFirst) {
        if (this.items[0]) {
          (this.items[0] as HTMLElement).setAttribute('style', 'border: 2px solid red');
        }
      }
    } else {
      console.error('Не передан селектор');
    }

    setTimeout(() => {
      this.renderComplete.emit(true);
    })
  }

  initKeyUp(evt: KeyboardEvent): void | boolean {

    if (evt.key === 'ArrowRight') {
      if (this.index === this.items.length - 1) {
        return false;
      }
      this.manageStyle(evt.key);

    } else if (evt.key === 'ArrowLeft') {
      if (this.index === 0) {
        return false;
      }
      this.manageStyle(evt.key);
    }
    if (this.index >= 0) {
      this.activeElementIndex = this.index;
    }
  }

  manageStyle(key: string): void {
    (this.items[this.index] as HTMLElement).removeAttribute('style');

    if (key === 'ArrowRight') {
      this.index++;
    } else {
      this.index--;
    }

    if (this.items[this.index]) {
      (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
    }
  }

  initStyle(index: number): void {
    if (this.items[index]) {
      (this.items[index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
    } else if (!this.items[index]) {
      (this.items[index] as HTMLElement).removeAttribute('style');
    }
  }

  updateItems(): void {
    this.items = this.el.nativeElement.querySelectorAll(this.selector);
  }
}
