import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common'

@Pipe({ name: 'spacedCurrency' })
export class SpacedCurrencyPipe extends CurrencyPipe implements PipeTransform {

  transform(value: any, currencyCode: string, symbolDisplay: boolean, digits?: string): string | null {
    let tempReturn = super.transform(value, currencyCode, symbolDisplay, digits)
    if (tempReturn === null) {
      return null
    }
    let firstNumberPos = tempReturn.search(/[0-9]/)
    return tempReturn.slice(0, firstNumberPos) + " " + tempReturn.slice(firstNumberPos, tempReturn.length)
  }
}
