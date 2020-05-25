import { Component, OnInit } from '@angular/core';
import { PaymentListService } from './../payment-list.service';
import { Pay } from './pay';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
  providers: [PaymentListService],
})
export class PaymentListComponent implements OnInit {
  pays: Pay[];
  editPay: Pay;
  constructor(private payService: PaymentListService) {}
  ngOnInit() {
    this.getPays();
  }

  getPays(): void {
    this.payService.getPays().subscribe((pays) => (this.pays = pays));
  }

  add(payDate: Date, amount: number, description?: string): void {
    this.editPay = undefined;
    if (!payDate || !amount) {
      return;
    }

    const newPay: Pay = {description,amount } as Pay;
    this.payService.addPay(newPay).subscribe((pay) => this.pays.push(pay));
  }

  delete(pay: Pay): void {
    this.pays = this.pays.filter((h) => h !== pay);
    this.payService.deletePay(pay.id).subscribe();
  }

  edit(pay: Pay) {
    this.editPay = pay;
  }

  search(searchTerm: string) {
    this.editPay = undefined;
    if (searchTerm) {
      this.payService
        .searchPays(searchTerm)
        .subscribe((pays) => (this.pays = pays));
    }
  }

  update() {
    if (this.editPay) {
      this.payService.updatePay(this.editPay).subscribe((pay) => {
        const ix = pay ? this.pays.findIndex((h) => h.id === pay.id) : -1;
        if (ix > -1) {
          this.pays[ix] = pay;
        }
      });
      this.editPay = undefined;
    }
  }
}