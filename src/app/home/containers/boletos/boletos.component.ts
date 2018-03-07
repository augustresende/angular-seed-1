import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import * as FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import { SocketService } from  './../../../shared/socket.service';
declare var canvas:any;
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import {ngOnInit} from './boletos.ngOnInit';

@Component({
	selector: 'app-boletos',
	templateUrl: './boletos.component.html',
	styleUrls: ['./boletos.component.scss']
})
export class BoletosComponent implements OnInit {
	modalRef: BsModalRef;
	modalComprovante: BsModalRef;

	masks:any = {
		codeNormal: [/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/, '.',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,' ',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,'.',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,' ',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,'.',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,' ',/[0-9]/,' ',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/],
		codeConvenio: [/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,' ',/[0-9]/,' ',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,' ',/[0-9]/,' ',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,' ',/[0-9]/,' ',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,' ',/[0-9]/],
		date: [/[0-9]/,/[0-9]/,'/',/[0-9]/,/[0-9]/,'/',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/],
		value:createNumberMask({
		  prefix: 'R$ ',
		  thousandsSeparatorSymbol: '.',
		  decimalSymbol: ',',
		  allowDecimal: true
		})

	};
	getCodeMask () {
		if (this.data.code&&this.data.code.substr(0,1) != '8') {
			return this.masks.codeNormal;
		}else {
			return this.masks.codeConvenio;
		}
		
	}

	data:any = {};

	pagamento:any = {};

	@ViewChild('success') private success: SwalComponent;
	@ViewChild('loading') private loading: SwalComponent;


	tick: number = 320;
  	private subscription: Subscription;

	constructor( private modalService: BsModalService, public socket:SocketService ) {
		
	}

	openModal(template: TemplateRef<any>, event) {
		let newData = this.data;
		newData.value = newData.value.replace('R$ ','');
		newData.code = newData.code.replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(',', '').replace(',', '').replace(',', '').replace(',', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '');
		newData.email = event;
		this.socket.sendMessage(newData);

		this.socket.socket
		.on('paybill', (data:any) => {
			console.log(data);
			this.pagamento = data;
			this.modalRef = this.modalService.show(template);
		})
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
