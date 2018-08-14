import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.sass']
})
export class CurrencyCardComponent {

  @Input() currency: any;

  currencies: string[] = ['USD', 'EUR'];
}

