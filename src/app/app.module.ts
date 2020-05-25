import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpirationPipe } from './expiration.pipe';
import { LongitudPipe } from './longitud.pipe';
import { ModalComponent } from './modal/modal.component';
import { PaymentListService } from './payment-list.service';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PrecisionPipe } from './precision.pipe';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PaymentListComponent,
    LongitudPipe,
    PrecisionPipe,
    ExpirationPipe,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [PaymentListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
