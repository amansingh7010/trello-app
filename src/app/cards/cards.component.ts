import { Component } from '@angular/core';

import { Card } from '../card';
import { CARDS } from '../mock-cards';
import { CardService } from '../card.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.getCards();
  }

  card: Card = {
    title: '',
    description: '',
  };

  showNewCardModal = false;

  cards: Card[] = [];

  getCards(): void {
    this.cardService.getCards().subscribe((cards) => (this.cards = cards));
  }

  saveCard(): void {
    this.cardService.saveCard(this.card).subscribe(() => {
      this.showNewCardModal = false;
      this.card = {
        title: '',
        description: '',
      };
    });
  }

  onNewCardButtonClick(): void {
    this.showNewCardModal = true;
  }

  onCancelNewCardButtonClick(): void {
    this.showNewCardModal = false;
  }

  onSaveCardButtonClick(): void {
    this.showNewCardModal = false;
  }
}
