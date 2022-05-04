import { HAND_LIMIT, ROW_LIMIT } from '../constants';
import { AbstractCard } from './abstract-card';
import { TurnPhases } from './turn-phases';
import { UnitCard } from './unit-card';

export class Player {
  private _hand: AbstractCard[];
  private _deck: AbstractCard[];
  private _graveyard: AbstractCard[];

  private _meleeRow: UnitCard[];
  private _rangeRow: UnitCard[];
  private _score: number;

  private _team: TurnPhases;

  constructor(deck: AbstractCard[], team: TurnPhases = TurnPhases.player1) {
    this.deck = deck;
    this.team = team;
  }

  public computeScore() {
    let score = 0;
    this.meleeRow.forEach((card) => (score += card.currentHealth));
    this.rangeRow.forEach((card) => (score += card.currentHealth));
    this.score = score;
  }

  public get team(): TurnPhases {
    return this._team;
  }
  public set team(value: TurnPhases) {
    this._team = value;
  }

  public get graveyard(): AbstractCard[] {
    return this._graveyard;
  }
  public set graveyard(value: AbstractCard[]) {
    this._graveyard = value;
  }

  public get meleeRow(): UnitCard[] {
    return this._meleeRow;
  }

  public set meleeRow(cards: UnitCard[]) {
    if (cards.length > ROW_LIMIT) cards = cards.slice(0, ROW_LIMIT);
    this._meleeRow = cards;
  }

  public get rangeRow(): UnitCard[] {
    return this._rangeRow;
  }

  public set rangeRow(cards: UnitCard[]) {
    if (cards.length > ROW_LIMIT) cards = cards.slice(0, ROW_LIMIT);
    this.rangeRow = cards;
  }

  public get deck(): AbstractCard[] {
    return this._deck;
  }

  public set deck(cards: AbstractCard[]) {
    cards.forEach((card) => this._deck.push(card));
  }

  public set hand(cards: AbstractCard[]) {
    cards.forEach((card) => {
      if (this.hand.length < HAND_LIMIT) {
        this._hand.push(card);
      }
    });
  }

  public get hand() {
    return this._hand;
  }

  public set score(value: number) {
    this._score = value;
  }

  public get score() {
    return this._score;
  }
}
