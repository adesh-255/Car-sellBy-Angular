import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstCharUppercas'
})
export class FirstCharUppercasPipe implements PipeTransform {

  transform(value: string): string {
    const firstCharUppercas = value.charAt(0).toUpperCase();
    const rest = value.substring(1);
    return firstCharUppercas + rest;
  }

}
