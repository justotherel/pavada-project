import { CardgameEngine } from '..';

import { UnitCard } from '../core/unit-card';
import { AbstractAbility } from '../core/abstract-ablity';
import { TurnPhases } from '../core/turn-phases';
import { Registry } from '../event-manager/interfaces/registry';
import { EventManager } from '../event-manager';
import { EventTypes } from '../event-manager/event-types';

export class RayanGoslingCard extends UnitCard {
  constructor(team: TurnPhases) {
    super({ name: 'RayanGosling', health: 10, armor: 4, team });
    this.addAbility(new RayanGoslingAbility(this));
  }
}

class RayanGoslingAbility extends AbstractAbility {
  private _parentCard: UnitCard;
  private readonly GameInstance = CardgameEngine.instance;
  private _eventsSubscribed: Registry;

  constructor(parentCard: UnitCard) {
    super(true, true, 1);
    this.parentCard = parentCard;
    this.eventsSubscribed = EventManager.instance.register(EventTypes.PlayerTurnEnd, () => {
      if (this.cooldown === 0) this.cast();
      else this.cooldown--;
    });
  }

  public get eventsSubscribed(): Registry {
    return this._eventsSubscribed;
  }
  public set eventsSubscribed(value: Registry) {
    this._eventsSubscribed = value;
  }

  public get parentCard(): UnitCard {
    return this._parentCard;
  }
  public set parentCard(value: UnitCard) {
    this._parentCard = value;
  }

  cast() {
    this.GameInstance.destroy(this.parentCard);
  }
}
