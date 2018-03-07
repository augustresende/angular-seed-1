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
	err:any='';
	buttondisabled:any=true;

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
	datavencimento;
	datavalue;
	getCodeMask () {
		if (this.data.code&&this.data.code.substr(0,1) != '8') {
			var base = new Date('1997-10-07T00:00:00');
			var code = this.data.code;
			code = code.replace(/ /g, '').replace(/\./g, '').replace(/_/g, '');
			var dataVenc = new Date(base.getTime() + (code.substr(33,4) * 24 * 60 * 60 * 1000));
			if (code.substr(33,4).length == 4) {
				var vencimento = ("0" + dataVenc.getDate()).substr(-2) + "/" + ("0" + (dataVenc.getMonth() + 1)).substr(-2) + "/" + dataVenc.getFullYear();
				this.datavencimento = true;
				this.data.vencimento = vencimento;
			} else {
				this.datavencimento = false;
				this.data.vencimento = "";
			}
			if (code.substr(37).length == 10) {
				var value = parseInt(code.substr(37)) / 100;
				this.datavalue = true;
				this.data.value = value.toFixed(2).replace(/\./g, ',');
			} else {
				this.datavalue = false;
				this.data.value = "";
			}
			this.err = '';
			if (code.substr(0,10).length == 10) {
				if (code.substr(9,1) != this.calculadv(code.substr(0,9))) {
					this.err = ("Digito verificador do campo 1 inválido");
				}
			}
			
			if (code.substr(10,11).length == 11) {
				if (code.substr(20,1) != this.calculadv(code.substr(10,10))) {
					this.err = ("Digito verificador do campo 2 inválido");
				}
			}
			
			if (code.substr(21,11).length == 11) {
				if (code.substr(31,1) != this.calculadv(code.substr(21,10))) {
					this.err = ("Digito verificador do campo 3 inválido");
				}
			}
			
			if (code.length == 47) {
				if (code.substr(32,1) != this.calculadvtotal(code.substr(0,32)+code.substr(33))) {
					this.err = ("Digito verificador do codigo de barras inválido");
				} else {
					this.buttondisabled = false;
				}
			} else {
				this.buttondisabled = true;
			}
			
			if (this.err) {
				this.buttondisabled = true;
			}
			return this.masks.codeNormal;
		} else {
			this.err = '';
			this.datavalue = false;
			this.data.value = "";
			this.datavencimento = false;
			this.data.vencimento = "";
			if (this.data.code) {
				this.buttondisabled = false;
			}
			return this.masks.codeConvenio;
		}
		
		
	}

	calculadv(numero){
		numero = numero.replace(/[^0-9]/g,'');
		var soma  = 0;
		var peso  = 2;
		var contador = numero.length-1;
		while (contador >= 0) {
			var multiplicacao = ( numero.substr(contador,1) * peso );
			if (multiplicacao >= 10) {multiplicacao = 1 + (multiplicacao-10);}
			soma = soma + multiplicacao;
			if (peso == 2) {
				peso = 1;
			} else {
				peso = 2;
			}
			contador = contador - 1;
		}
		var digito = 10 - (soma % 10);
		if (digito == 10) digito = 0;
		return digito;
	}
	
	calculadvtotal(numero){
		numero = numero.replace(/[^0-9]/g,'');
		var soma  = 0;
		var peso  = 2;
		var base  = 9;
		var resto = 0;
		var contador = numero.length - 1;
		for (var i=contador; i >= 0; i--) {
			soma = soma + ( numero.substring(i,i+1) * peso);
			if (peso < base) {
				peso++;
			} else {
				peso = 2;
			}
		}
		var digito = 11 - (soma % 11);
		if (digito >  9) digito = 0;
		if (digito == 0) digito = 1;
		return digito;
	}
	
	data:any = {};
	

	pagamento:any = {};

	@ViewChild('success') private success: SwalComponent;
	@ViewChild('loading') private loading: SwalComponent;


	tick: number = 320;
	tick_total: number = 320;

  	private subscription: Subscription;

	constructor( private modalService: BsModalService, public socket:SocketService ) {
		
	}

	openModal(template: TemplateRef<any>, template2: TemplateRef<any>, event) {
		let newData = this.data;
		newData.value = newData.value.replace('R$ ','');
		newData.code = newData.code.replace(/ /g, '').replace(/\./g, '').replace(/_/g, '');
		newData.email = event;
		newData.vencimento = newData.vencimento;
		this.socket.sendMessage(newData);

		this.socket.socket
		.on('paybill', (data:any) => {
			console.log(data);
			this.tick = data.expire;
			this.tick_total = data.expire;
			this.pagamento = data;
			this.modalRef = this.modalService.show(template);
		})
		
		this.socket.socket
		.on('confirmed', (data:any) => {
			console.log(data);
			this.modalRef.hide()
			this.modalComprovante = this.modalService.show(template2);
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
