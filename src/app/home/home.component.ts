import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PaymentService} from '../shared/services/payment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  showThankYou = false;

  constructor(private route: ActivatedRoute, private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    const paymentToken = this.route.snapshot.queryParamMap.get('token');
    if(!!paymentToken) {
      this.paymentService.approvePayment(paymentToken).subscribe(
        () => {
          this.showThankYouMessage();
        }
      );
    }
  }

  showThankYouMessage(): void {
    this.showThankYou = true;
  }

}
