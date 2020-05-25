import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precision',
})
export class PrecisionPipe implements PipeTransform {
  transform(value: number, limit?: number) {
    const defaultPrecision = 2;
    if (!value) return null;
    let actualPrecision = limit ? limit : defaultPrecision;
    return Math.round(value);
  }
}