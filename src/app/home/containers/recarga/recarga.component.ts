import { Component, OnInit } from '@angular/core';

class Recarga {
	number:string;
	value:number;
}

@Component({
  selector: 'app-recarga',
  templateUrl: './recarga.component.html',
  styleUrls: ['./recarga.component.scss']
})
export class RecargaComponent implements OnInit {
public phoneMask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  recarga:Recarga = new Recarga();	

  constructor() {
  }

  ngOnInit() {
  }
  submitRecarga() {
  	console.log(this.recarga);
  }

}
