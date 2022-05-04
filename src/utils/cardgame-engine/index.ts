import { EgorRadikCard } from './cards/egor-radik';
import { RayanGoslingCard } from './cards/rayan-gosling';
import { AbstractCard } from './core/abstract-card';
import { BoardSides } from './core/board-sides';
import { HAND_LIMIT } from './constants';
import { ActionContext } from './core/context';
import { GamePhases } from './core/game-phases';
import { Player } from './core/player';
import { Rows } from './core/rows';
import { TurnPhases } from './core/turn-phases';
import { UnitCard } from './core/unit-card';
import { EventManager } from './event-manager';
import { EventTypes } from './event-manager/event-types';

export const deck1 = [
  new RayanGoslingCard(TurnPhases.player1),
  new RayanGoslingCard(TurnPhases.player1),
  new EgorRadikCard(TurnPhases.player1),
];
export const deck2 = [
  new RayanGoslingCard(TurnPhases.player2),
  new RayanGoslingCard(TurnPhases.player2),
  new EgorRadikCard(TurnPhases.player2),
];

export class CardgameEngine {
  private static _instance: CardgameEngine;

  private _player1: Player;
  private _player2: Player;
  private _phase: GamePhases;

  private currentTurn: TurnPhases;

  private constructor(deck1: AbstractCard[], deck2: AbstractCard[], currentTurn: TurnPhases) {
    this.player1 = new Player(deck1);
    this.player2 = new Player(deck2);
    this.currentTurn = currentTurn;
  }

  public static get instance(): CardgameEngine {
    if (!CardgameEngine._instance) {
      CardgameEngine._instance = new CardgameEngine(deck1, deck2, TurnPhases.player1);
    }
    return CardgameEngine._instance;
  }

  private update(phase: GamePhases, context: ActionContext) {
    switch (phase) {
      case GamePhases.Drawing: {
        // draw cards
        this.phase = GamePhases.Drawing;
        this.drawAmount(this.player1);
        this.drawAmount(this.player2);
        // allow redraw ?
        break;
      }
      case GamePhases.PlayerTurnStart: {
        // Player turn start
        // Trigger all player's cards' ablities related to turn start
        this.phase = GamePhases.PlayerTurnStart;
        EventManager.instance.dispatch(EventTypes.PlayerTurnStart);
        break;
      }
      case GamePhases.PlayerTurnEnd: {
        // Player turn end
        // Trigger all player's cards' ablities related to turn end
        this.phase = GamePhases.PlayerTurnEnd;
        EventManager.instance.dispatch(EventTypes.PlayerTurnEnd);
      }
      case GamePhases.EnemyTurn: {
        // Enemy turn start

        break;
      }
      // case GamePhases.PlayCard: {
      //   if (this.currentTurn === TurnPhases.player1) {
      //     const { side, row, position, card } = context;
      //     this.playUnitCard(side, row, position, card);
      //   }
      //   break;
      // }
      // case GamePhases.UseCardAbility: {
      //   break;
      // }
      default: {
        throw Error('Error: INVALID GAME STATE');
      }
    }
  }

  private drawAmount(player: Player, amount: number = HAND_LIMIT): void {
    for (let i = 0; i < amount; i++) {
      this.draw(player);
    }
  }

  private switchTurn() {
    if (this.currentTurn === TurnPhases.player1) this.currentTurn = TurnPhases.player2;
    else this.currentTurn = TurnPhases.player1;
  }

  public getPlayer(team: TurnPhases): Player {
    if (team === TurnPhases.player1) return this.player1;
    else return this.player2;
  }

  public getEnemyteam(team: TurnPhases): Player {
    if (team === TurnPhases.player1) return this.player2;
    else return this.player1;
  }

  public dealDamage(target: UnitCard, amount: number) {
    // ugly
    if (target.armor) {
      const residue = Math.abs(target.armor - amount);
      if (residue >= 0) {
        target.armor = 0;
        target.currentHealth -= residue;
      } else {
        target.armor -= amount;
      }
    }
    target.currentHealth -= amount;
  }

  public heal(target: UnitCard) {
    target.currentHealth = target.health;
  }

  public boost(target: UnitCard, amount: number) {
    target.health += amount;
    target.currentHealth += amount;
  }

  public giveArmor(target: UnitCard, amount: number) {
    target.armor += amount;
  }

  public draw(target: Player) {
    const card = target.deck.pop();
    if (card && target.hand.length !== HAND_LIMIT) target.hand.push(card);
  }

  public destroy(target: UnitCard, position?: Rows) {
    const player = target.team === TurnPhases.player1 ? this.player1 : this.player2;
    if (position && position === Rows.Meele) {
      player.meleeRow.filter((card) => card != target);
    } else if (position) {
      player.rangeRow.filter((card) => card != target);
    } else {
      if (player.meleeRow.find((card) => card === target)) player.meleeRow.filter((card) => card != target);
      else if (player.rangeRow.find((card) => card === target)) player.rangeRow.filter((card) => card != target);
      else return;
    }

    player.graveyard.push(target);
    EventManager.instance.dispatch(EventTypes.UnitCardDestroyed, player.team);
  }

  public playUnitCard(side: BoardSides, row: Rows, position: number, card: UnitCard) {
    if (this.currentTurn === TurnPhases.player1) {
      const playOnFriendlySide = side === BoardSides.friendly ? true : false;
      const playOnMeleeRow = row === Rows.Meele ? true : false;

      if (playOnFriendlySide) {
        if (playOnMeleeRow) {
          if (!this.player1.meleeRow[position]) {
            this.player1.meleeRow[position] = card;
            this.player1.hand.filter((cardInHand) => cardInHand != card);
          }
        } else {
          if (!this.player1.rangeRow[position]) {
            this.player1.rangeRow[position] = card;
            this.player1.hand.filter((cardInHand) => cardInHand != card);
          }
        }
      } else {
        if (playOnMeleeRow) {
          if (!this.player2.meleeRow[position]) {
            this.player2.meleeRow[position] = card;
            this.player1.hand.filter((cardInHand) => cardInHand != card);
          }
        } else {
          if (!this.player2.rangeRow[position]) {
            this.player2.rangeRow[position] = card;
            this.player1.hand.filter((cardInHand) => cardInHand != card);
          }
        }
      }
      EventManager.instance.dispatch(EventTypes.PlayCard);
    }
  }

  public get phase(): GamePhases {
    return this._phase;
  }

  public set phase(value: GamePhases) {
    this._phase = value;
  }

  public get player1(): Player {
    return this._player1;
  }

  public set player1(value: Player) {
    this._player1 = value;
  }

  public get player2(): Player {
    return this._player2;
  }

  public set player2(value: Player) {
    this._player2 = value;
  }
}
