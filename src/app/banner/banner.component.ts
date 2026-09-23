import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit {
  count = signal(0);
  loading = signal(true);

  ngOnInit() {
    this.loading.set(false);
  }

  clickFunction() {
    this.count.update(v => v + 1);
    console.log("button is clicked");
  }
}
