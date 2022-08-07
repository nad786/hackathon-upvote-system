import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArray',
})
export class FilterArrayPipe implements PipeTransform {
  transform(value: Array<any>, ...args: any[]): unknown {
    if (args.length) {
      return value;
    }
    return value.sort((a, b) => a[args[0]] - b[args[0]]);
  }
}
