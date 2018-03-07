import { Component, OnInit } from '@angular/core';
import { changePage } from './../../../shared/animations/fade-in.animation';

import { SocketService } from './../../../shared/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ changePage ],
  providers: [ SocketService ]
})


export class AppComponent implements OnInit{
  i:number = 0;
  connection;
  constructor(
  private socketService:SocketService
  ) {
  }
  getPage(outlet) {
	return outlet.activatedRouteData.page;
  }
  price: string = "R$";
  ngOnInit(){
	  //this.price = "R$ 99,00";
      this.connection = this.socketService.getMessages("price").subscribe(message => {
        if (typeof message === "string"){
           this.price = message;
        }
        //this.price = message;
      });

  }
  
}
