import { TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext( 
      () => new HighlightDirective()
    );

    expect(directive).toBeTruthy();
  });
});
