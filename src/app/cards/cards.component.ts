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
    if (this.selectedCard._id) {
      this.cardService.updateCard(this.selectedCard).subscribe(() => {
        this.getCards();
        this.showNewCardModal = false;
        this.selectedCard = {
          name: '',
          desc: '',
        };
      });
    } else {
      this.cardService.saveCard(this.selectedCard).subscribe(() => {
        this.getCards();
        this.showNewCardModal = false;
        this.selectedCard = {
          name: '',
          desc: '',
        };
      });
    }
  }

  deleteCard(): void {
    this.cardService.deleteCard(this.selectedCard._id || '').subscribe(() => {
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
    this.selectedCard = {
      name: '',
      desc: '',
    };
  }

  onCancelNewCardButtonClick(): void {
    this.showNewCardModal = false;
    this.selectedCard = {
      name: '',
      desc: '',
    };
  }

  onCardClick(card: Card): void {
    this.selectedCard = { ...card };
    this.showNewCardModal = true;
  }
}
