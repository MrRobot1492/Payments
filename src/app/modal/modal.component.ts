import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { AppError } from './../common/validators/app-error';
import { BadRequestError } from './../common/validators/bad-request-error';
import { Pay } from './../payment-list/pay';
//import { PaymentListComponent } from '../payment-list/payment-list.component';

// This lets me use jquery
declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [PaymentService]
})
export class ModalComponent implements OnInit {
  constructor(private payService: PaymentService) {}
  maxDate: Date;
  maxDateDiff = 7;
  paymentAmount: number;
  paymentDescription: string;
  PaymentDate: Date;

  ngOnInit() {
    let minDate = new Date();
    this.maxDate = new Date(
      minDate.setDate(minDate.getDate() - this.maxDateDiff)
    );
  }

  showModal(): void {
    $('#myModal').modal('show');
  }

  submit(input: HTMLInputElement) {
    let newPay = {} as Pay;
    newPay._id = "";
    newPay.amount = 1000;
    newPay.date = '1/1/2000'; //new Date(input.getAttribute('paymentDate'));
    newPay.description = input.value; //input.getAttribute('paymentDescription');
    // console.log(
    //   JSON.stringify({
    //     amount: newPay.amount,
    //     date: newPay.date,
    //     description: newPay.description,
    //   })
    // );
    console.log(newPay);
    this.add(newPay);
    this.hideModal();
  }

  add(pay: Pay): void {
    delete pay._id;
    this.payService.create(pay).subscribe(
      (response) => {
        //this.payment.pays.splice(0,0,pay);
        pay['id'] = response['_id'];
        console.log(response);
      },
      (error: AppError) => {
        if (error instanceof BadRequestError)
          alert('The server reported a Bad Request');
        else throw error;
      }
    );
  }

  hideModal(): void {
    document.getElementById('close-modal').click();
  }
}