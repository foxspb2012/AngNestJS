import { BlockStyleDirective } from './block-style.directive';
import { ElementRef } from '@angular/core';

describe('BlockStyleDirective', (): void => {
  it('should create an instance', (): void => {
    let el: ElementRef | any = 'string';
    const directive: BlockStyleDirective = new BlockStyleDirective(el);
    expect(directive).toBeTruthy();
  });
});
