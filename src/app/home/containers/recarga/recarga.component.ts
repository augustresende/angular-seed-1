import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recarga',
  templateUrl: './recarga.component.html',
  styleUrls: ['./recarga.component.scss']
})
export class RecargaComponent implements OnInit {
public phoneMask = ['(', /\d/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
	phone:string;
	open:boolean=false;
  constructor() {
  }

  ngOnInit() {
  }

}
