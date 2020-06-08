import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { AppError } from './../common/validators/app-error';
import { BadRequestError } from './../common/validators/bad-request-error';
import { NotFoundError } from './../common/validators/not-found-error';
import { TopBarChangedEventArgs } from './../top-bar/top-bar.component';
import { Pay } from './pay';

@Component({
  selector: 'payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
  providers: [PaymentService],
})
export class PaymentListComponent implements OnInit {
  pays: Pay[];
  editPay: Pay;
  constructor(private payService: PaymentService) {}
  ngOnInit() {
    this.getPays();
  }

  getPays(): void {
    this.payService.getAll()
        .subscribe(
          pays => {
            this.pays=pays as any[];
            console.log(pays);
          },
          (error:AppError)=> {
            if(error instanceof BadRequestError)
              alert('The server reported a BadRequest');
            else throw error;
          });
  }

  delete(pay: Pay): void {
    this.payService.delete(pay._id).subscribe(
      response =>{
        let index = this.pays.indexOf(pay);
        this.pays.splice(index,1);
        console.log(response);
      },
      (error:AppError)=>{
        if(error instanceof NotFoundError) alert('This payment was deleted');
        else throw error;
      }
    );
  }

  update(pay: Pay): void {
    this.payService.update(pay).subscribe(
      response =>{
        console.log(response);
      },
      (error:AppError)=>{
        if(error instanceof BadRequestError) alert('Bad Request error');
        else throw error;
      }
    );
  }

  onTopChanged(eventArgs: TopBarChangedEventArgs){
    console.log('Top Changed', eventArgs);
  }

  // activate(){
  //   readonly="true"
  // }

  // search(searchTerm: string) {
  //   this.editPay = undefined;
  //   if (searchTerm) {
  //     this.payService
  //       .searchPays(searchTerm)
  //       .subscribe((pays) => (this.pays = pays));
  //   }
  // }
}