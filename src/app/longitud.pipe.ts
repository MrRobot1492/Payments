import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longitud'
})
export class LongitudPipe implements PipeTransform {

  transform(value: string, limit?: number) {
    const maxLimit=255;
    if (!value) return null;
    let actualLimit = (limit) ? limit : maxLimit;
    return value.substring(0,actualLimit);
  }
}