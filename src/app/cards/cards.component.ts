import { Component } from '@angular/core';

import { Card } from '../card';
import { CARDS } from '../mock-cards';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  showNewCardModal = true;
  cards = CARDS;
  onNewCardButtonClick = () => (this.showNewCardModal = true);
  onCancelNewCardButtonClick = () => (this.showNewCardModal = false);
}
