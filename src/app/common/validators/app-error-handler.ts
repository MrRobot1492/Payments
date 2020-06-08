import { ErrorHandler } from '@angular/core';
import { Observable } from 'rxjs';
import { AppError } from './app-error';
import { BadRequestError } from './bad-request-error';
import { NotFoundError } from './not-found-error';

export class AppErrorHandler implements ErrorHandler {
  handleError(error) {
    console.log(error);
    alert('An unexpected error ocurred!');
  }

  handleExpectedError(error: Response) {
    // alert('error:' + typeof error 
    // + 'JSON:' + JSON.stringify(error)
    // + 'status:' + error.status);
   if(error.status===400)
    return Observable.throw(new BadRequestError(error));
   if(error.status===404)
    return Observable.throw(new NotFoundError());
 return Observable.throw(new AppError(error));
 }
}