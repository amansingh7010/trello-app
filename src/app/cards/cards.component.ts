import { Component } from '@angular/core';

import { Card } from './card';
import { CARDS } from './mock-cards';
import { CardService } from './card.service';

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

  selectedCard: Card = {
    name: '',
    desc: '',
  };

  showNewCardModal = false;

  cards: Card[] = [];

  getCards(): void {
    this.cardService.getCards().subscribe((cards) => (this.cards = cards));
  }

  saveCard(): void {
    this.cardService.saveCard(this.selectedCard).subscribe(() => {
      this.getCards();
      this.showNewCardModal = false;
      this.selectedCard = {
        name: '',
        desc: '',
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
