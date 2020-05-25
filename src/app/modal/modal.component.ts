import { Component, OnInit } from '@angular/core';

// This lets me use jquery
declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  constructor() {}
  paymentAm: number;
  amountError: string;
  selectedDate: Date;
  ngOnInit() {}
  showModal(): void {
    $('#myModal').modal('show');
  }

  sendModal(): void {
    let errorMsg: string;
    if (!this.validateAmount()) 
      errorMsg = 'Amount must be greater than zero';
    if (!this.validateDate())
      errorMsg = 'Date must be greater than today less 7 natural days';
    if (errorMsg.length > 0) 
      alert(errorMsg);
  }

  hideModal(): void {
    document.getElementById('close-modal').click();
  }

  validateAmount(): boolean {
    if (this.paymentAm < 0) return false;
  }

  validateDate(): boolean {
    if (this.selectedDate < this.getMinDate()) return false;
  }

  getMinDate(): Date {
    let today = new Date();
    let day = today.getDate() - 7;
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    if (day < 10) day = 0 + day;
    if (month < 10) month = 0 + month;
    return new Date(month + '-' + day + '-' + year);
  }
}