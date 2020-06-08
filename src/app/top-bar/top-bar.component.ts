import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { Pay } from '../payment-list/pay';
import { PaymentListComponent } from '../payment-list/payment-list.component';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  @Input() isAdding: boolean;
  @Output('change') click = new EventEmitter();

  totalAmount: number;
  payment: PaymentListComponent;
  pays: Pay[];
  constructor() {}

  ngOnInit(): void {
    this.simulatePays();
    this.totalAmount = 0;
    this.pays.map((a) => {
      this.totalAmount += a.amount;
    });
    console.log(this.pays);
  }

  simulatePays() {
    this.pays = [];
    let simulatedPay = {} as Pay;
    simulatedPay.amount = 5000;
    this.pays.push(simulatedPay);
    simulatedPay = {} as Pay;
    simulatedPay.amount = 6000;
    this.pays.push(simulatedPay);
    simulatedPay = {} as Pay;
    simulatedPay.amount = 2000;
    this.pays.push(simulatedPay);
  }

  AddEddit(isEditing) {
    alert('ADD/EDIT');
  }

  showModal(): void {}

  onChange(): void {
    this.click.emit('newValue', this.isAdding);
  }
}

export interface TopBarChangedEventArgs {
  newValue: boolean;
}