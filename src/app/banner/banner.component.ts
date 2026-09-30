import { Component, OnInit, signal } from '@angular/core';
import { HighlightDirective } from '../highlight.directive';

@Component({
  selector: 'app-banner',
  imports: [HighlightDirective],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  title = signal('Test tour of heroes');
}
