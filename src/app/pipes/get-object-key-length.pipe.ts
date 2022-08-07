import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getObjectKeyLength',
})
export class GetObjectKeyLengthPipe implements PipeTransform {
  transform(value: Object, ...args: unknown[]): unknown {
    return Object.keys(value).length;
  }
}
