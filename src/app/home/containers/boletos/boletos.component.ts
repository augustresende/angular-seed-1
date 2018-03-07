import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import * as FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
declare var canvas:any;
import {ngOnInit} from './boletos.ngOnInit';

@Component({
	selector: 'app-boletos',
	templateUrl: './boletos.component.html',
	styleUrls: ['./boletos.component.scss']
})
export class BoletosComponent implements OnInit {
	modalRef: BsModalRef;
	modalComprovante: BsModalRef;

	@ViewChild('success') private success: SwalComponent;
	@ViewChild('loading') private loading: SwalComponent;


	tick: number = 320;
  	private subscription: Subscription;

	constructor(private modalService: BsModalService) {}

	openModal(template: TemplateRef<any>, event) {
		console.log(event);
		this.modalRef = this.modalService.show(template);
	}
	openComprovante(template: TemplateRef<any>) {
		this.loading.show();
		setTimeout(() => {
			this.modalComprovante = this.modalService.show(template);
		},4000);
	}
	printComprovante() {
		html2canvas(document.querySelector("#comprovante"))
		.then(canvas => {
			canvas.toBlob((	blob ) => {
				FileSaver.saveAs(blob, "comprovante.png");   
			})
		});
	}
	ngOnInit() {
		let timer = TimerObservable.create(2000, 1000);
	    this.subscription = timer.subscribe(() => {
	      this.tick = this.tick - 1;
	      if(this.tick==0) {
	    	this.subscription.unsubscribe();
	      }
	    });
	}
	confirmEmail(data:any) {
		this.success.show();
	}
	initiateTimer() {
	    
	}

}
