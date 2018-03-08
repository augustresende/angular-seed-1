import { Component, ViewChild, OnInit } from '@angular/core';
import { SocketService } from  './../../../shared/socket.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { BsModalRef } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Subscription} from "rxjs";

class Recarga {
	number:string;
	operadora:string;
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
  number:any = "";
  comprovante:any = "";
  values:any = [];
  @ViewChild('loading') private loading: SwalComponent;
  modalRef: BsModalRef;
  modalComprovante: BsModalRef;
  pagamento:any = {};
  tick: number = 320;
  tick_total: number = 320;
  private subscription: Subscription;
  
  providers:any = [{"pricesGroups":[{"cardId":738,"areaCodes":["68","92","97","96","61","27","28","61","62","64","67","65","66","91","93","94","83","41","42","43","44","45","46","21","22","24","69","84","95","51","53","54","55","79","42","47","48","49","11","12","13","14","15","16","17","18","19","63","82","86","89","98","99"],"prices":[{"defaultPrice":false,"amount":"R$50","priceId":2642,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$40","priceId":2789,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$30","priceId":2641,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$25","priceId":2640,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$20","priceId":2639,"extraCharge":"R$0"},{"defaultPrice":true,"amount":"R$14","priceId":2788,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$10","autoSelected":true,"priceId":2637,"extraCharge":"R$0"}]},{"cardId":637,"areaCodes":["71","73","74","75","77","85","88","31","32","33","34","35","37","38","81","87"],"prices":[{"defaultPrice":false,"amount":"R$50","priceId":2343,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$40","priceId":2785,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$30","priceId":2500,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$25","priceId":2341,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$20","priceId":2340,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$14","priceId":2338,"extraCharge":"R$0"},{"defaultPrice":true,"amount":"R$10","priceId":2485,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$8","autoSelected":true,"priceId":2784,"extraCharge":"R$0"}]}],"name":"Oi","currency":"BRL","id":"OI","logoUrl":"http://cnt.recarga.com/img-app/providers/oi.png","bigLogoUrl":"http://cnt.recarga.com/img-app/providers/oi-big.png"},{"pricesGroups":[{"cardId":707,"areaCodes":["61","62","64","31","32","33","34","35","37","38","11","12","13","14","15","16","17","18","19"],"prices":[{"defaultPrice":false,"amount":"R$50","priceId":2475,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$30","priceId":2802,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$20","priceId":2472,"extraCharge":"R$0"},{"defaultPrice":true,"amount":"R$15","priceId":2593,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$13","autoSelected":true,"priceId":3144,"extraCharge":"R$0"}]}],"name":"Algar","currency":"BRL","id":"ALGAR","logoUrl":"http://cnt.recarga.com/img-app/providers/algar.png","bigLogoUrl":"http://cnt.recarga.com/img-app/providers/algar-big.png"},{"pricesGroups":[{"cardId":700,"areaCodes":["11","12","13","14","15","16","17","18","19","21","22","24","27","28","41","84","43","44","45","46","47","48","49","51","53","54","55","61","62","63","64","65","66","67","68","69","91","92","93","94","95","96","97","98","99","31","32","33","34","35","37","38","71","73","74","75","77","79","81","82","83","84","85","86","87","88","89"],"prices":[{"defaultPrice":false,"amount":"R$50","priceId":2433,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$35","priceId":2432,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$25","priceId":2431,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$20","priceId":2430,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$15","priceId":2429,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$12","priceId":3146,"extraCharge":"R$0"},{"defaultPrice":true,"amount":"R$10","priceId":2428,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$7","autoSelected":true,"priceId":3154,"extraCharge":"R$0"}]}],"name":"Vivo","currency":"BRL","id":"VIVO","logoUrl":"http://cnt.recarga.com/img-app/providers/vivo.png","bigLogoUrl":"http://cnt.recarga.com/img-app/providers/vivo-big.png"},{"pricesGroups":[{"cardId":694,"areaCodes":["14","15","16","17","18","27","28","32","34","37","51","53","54","55","61","64","65","67","68","69","92","93","95","96"],"prices":[{"defaultPrice":false,"amount":"R$50","priceId":2401,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$40","priceId":3127,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$30","priceId":2531,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$20","priceId":2530,"extraCharge":"R$0"},{"defaultPrice":true,"amount":"R$15","priceId":2529,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$10","autoSelected":true,"priceId":2487,"extraCharge":"R$0"}]},{"cardId":735,"areaCodes":["19","21","22","24","31","33","35","38","62","63","66","71","73","74","75","77","79","81","82","83","84","85","86","87","88","89","91","94","97","98","99"],"prices":[{"defaultPrice":false,"amount":"R$50","priceId":2635,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$40","priceId":3130,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$30","priceId":2633,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$20","priceId":2632,"extraCharge":"R$0"},{"defaultPrice":true,"amount":"R$15","priceId":2631,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$10","autoSelected":true,"priceId":2610,"extraCharge":"R$0"}]},{"cardId":536,"areaCodes":["11","12","13","41","42","43","44","45","46","47","48","49","78","80","90"],"prices":[{"defaultPrice":false,"amount":"R$50","priceId":1875,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$40","priceId":3122,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$30","priceId":2657,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$20","priceId":1819,"extraCharge":"R$0"},{"defaultPrice":true,"amount":"R$15","priceId":2656,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$10","autoSelected":true,"priceId":2958,"extraCharge":"R$0"}]}],"name":"Tim","currency":"BRL","balanceCheck":{"sms":{"number":"222","text":"sal"},"ussd":{"number":"*222#"}},"id":"TIM","logoUrl":"http://cnt.recarga.com/img-app/providers/tim.png","bigLogoUrl":"http://cnt.recarga.com/img-app/providers/tim-big.png"},{"pricesGroups":[{"cardId":733,"areaCodes":["43","45","44","42","41","46"],"prices":[{"defaultPrice":false,"amount":"R$50","priceId":2604,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$35","priceId":2603,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$20","priceId":2601,"extraCharge":"R$0"},{"defaultPrice":true,"amount":"R$15","priceId":2602,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$10","autoSelected":true,"priceId":2600,"extraCharge":"R$0"}]}],"name":"Sercomtel","currency":"BRL","id":"SERCOMTEL","logoUrl":"http://cnt.recarga.com/img-app/providers/sercomtel.png","bigLogoUrl":"http://cnt.recarga.com/img-app/providers/sercomtel-big.png"},{"pricesGroups":[{"cardId":688,"areaCodes":["11","12","13","14","15","16","17","18","19","21","22","24","27","28","31","32","33","34","35","37","38","41","42","43","44","45","46","47","48","49","51","53","54","55","61","62","63","64","65","66","67","68","69","71","73","74","75","77","79","81","82","83","84","85","86","87","88","89","91","92","93","94","95","96","97","98","99"],"prices":[{"defaultPrice":false,"amount":"R$50","priceId":2358,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$30","priceId":2357,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$25","priceId":2356,"extraCharge":"R$0"},{"defaultPrice":true,"amount":"R$20","priceId":2355,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$15","autoSelected":true,"priceId":2354,"extraCharge":"R$0"}]}],"name":"Nextel","currency":"BRL","id":"NEXTEL","logoUrl":"http://cnt.recarga.com/img-app/providers/nextel.png","bigLogoUrl":"http://cnt.recarga.com/img-app/providers/nextel-big.png"},{"pricesGroups":[{"cardId":701,"areaCodes":["11","12","13","14","15","16","17","18","19","21","22","24","27","28","31","32","33","34","35","37","38","41","42","43","44","45","46","47","48","49","51","53","54","55","61","62","63","64","65","66","67","68","69"],"prices":[{"defaultPrice":false,"amount":"R$50","priceId":2450,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$30","priceId":2449,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$20","priceId":2491,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$15","priceId":2540,"extraCharge":"R$0"},{"defaultPrice":true,"amount":"R$13","priceId":2446,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$10","autoSelected":true,"priceId":2539,"extraCharge":"R$0"}]},{"cardId":704,"areaCodes":["71","73","74","75","77","79","81","82","83","84","85","86","87","88","89","91","92","93","94","95","96","97","98","99"],"prices":[{"defaultPrice":false,"amount":"R$50","priceId":2468,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$30","priceId":2467,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$20","priceId":2494,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$15","priceId":2543,"extraCharge":"R$0"},{"defaultPrice":true,"amount":"R$13","priceId":2464,"extraCharge":"R$0"},{"defaultPrice":false,"amount":"R$10","autoSelected":true,"priceId":2463,"extraCharge":"R$0"}]}],"name":"Claro","currency":"BRL","id":"CLARO","logoUrl":"http://cnt.recarga.com/img-app/providers/claro.png","bigLogoUrl":"http://cnt.recarga.com/img-app/providers/claro-big.png"}];

  constructor(private modalService: BsModalService, public socket:SocketService) {
  }

	getRecargaMask () {
		if (this.recarga.number) {
			var newnumber = this.recarga.number.replace(/[^0-9]/g, "");
			if (this.number != newnumber) {
				if (newnumber.length == 11) {
					this.number = newnumber;
					this.socket.sendMessage('telein', {"phone": newnumber});
					this.socket.socket
					.on('telein', (data:any) => {
						this.recarga.operadora = data;
						var provider = this.providers.find(item => item.id === data)
						var values = [];
						
						console.log(provider.pricesGroups);
						provider.pricesGroups.forEach(function (array, i1) {
							array.areaCodes.forEach(function (array, i2) {
								if(array == newnumber.substr(0,2)) {
									console.log(provider.pricesGroups[i1]);
									//this.values = provider.pricesGroups[i1].prices.reverse();
									provider.pricesGroups[i1].prices.reverse().forEach(function (array, i3) {
										//var rmrs = array.amount.replace('R$', '');
										if(values.length < 4) {
											values.push(array.amount.replace('R$', ''));
										}
									});
								}
							});
						})
						this.values = values;
					})
				} else {
					this.number = "";
					this.recarga.operadora = "";
				}
			}
		}
		return this.phoneMask;
	}
	logopath() {
		if(this.recarga.operadora) {
			return "/assets/images/"+this.recarga.operadora+".png";
		}
		else {
			return "";
		}
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
  
  
  
  submitRecarga(template, template2) {
	//this.loading.show();
	//this.modalRef = this.modalService.show(template);
	this.socket.sendMessage('recharge', {phone: this.recarga.number, operator: this.recarga.operadora, value: this.recarga.value});

	this.socket.socket
	.on('recharge', (data:any) => {
		console.log(data);
		this.tick = data.expire;
		this.tick_total = data.expire;
		this.pagamento = data;
		this.modalRef = this.modalService.show(template);
	})
		
	this.socket.socket
	.on('confirmed', (data:any) => {
		this.modalRef.hide()
		this.loading.show();
		//this.modalRef.hide()
		//this.modalComprovante = this.modalService.show(template2);
	})
	
	this.socket.socket
	.on('recharged', (data:any) => {
		this.modalRef.hide()
		console.log(data);
		this.comprovante = data;
		this.modalRef = this.modalService.show(template2);
	})

  	console.log(this.recarga);
  }

}
