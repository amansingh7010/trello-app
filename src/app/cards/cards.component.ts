import { Component } from '@angular/core';

import { Card } from '../card';
import { CARDS } from '../mock-cards';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  card = {
    title: '',
    description: '',
  };
  showNewCardModal = false;
  cards = CARDS;
  onNewCardButtonClick = () => (this.showNewCardModal = true);
  onCancelNewCardButtonClick = () => (this.showNewCardModal = false);
  onSaveCardButtonClick = () => (this.showNewCardModal = false);
}
