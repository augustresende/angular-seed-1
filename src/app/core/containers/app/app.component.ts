import { Component } from '@angular/core';
import { changePage } from './../../../shared/animations/fade-in.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ changePage ]
})
export class AppComponent {
  i:number = 0;
  constructor(
  ) {
  }
  getPage(outlet) {
	  return outlet.activatedRouteData.page;
	}
}
