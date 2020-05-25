import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expiration'
})
export class ExpirationPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
