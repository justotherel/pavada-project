import { CardgameEngine } from '..';
import { AbstractAbility } from '../core/abstract-ablity';
import { UnitCard } from '../core/unit-card';
import { TurnPhases } from '../core/turn-phases';

export class EgorRadikCard extends UnitCard {
  constructor(team: TurnPhases) {
    super({ name: 'EgorRadik', health: 6, team });
    this.addAbility(new EgoraRadikAbility(this));
  }
}

class EgoraRadikAbility extends AbstractAbility {
  private _parentCard: UnitCard;
  private readonly GameInstance = CardgameEngine.instance

  constructor(parentCard: UnitCard) {
    super(false, true, 1);
    this.parentCard = parentCard;
  }

  public get parentCard(): UnitCard {
    return this._parentCard;
  }
  public set parentCard(value: UnitCard) {
    this._parentCard = value;
  }

  cast() {
    const frendlies = this.GameInstance.getPlayer(this.parentCard.team);
    const enemimies = this.GameInstance.getEnemyteam(this.parentCard.team);

    frendlies.meleeRow.forEach((card) => this.GameInstance.dealDamage(card, 2));
    frendlies.rangeRow.forEach((card) => this.GameInstance.dealDamage(card, 2));

    enemimies.meleeRow.forEach((card) => this.GameInstance.dealDamage(card, 1));
    enemimies.rangeRow.forEach((card) => this.GameInstance.dealDamage(card, 1));
  }
}
