import { AbstractAbility } from './abstract-ablity';
import { AbstractCard } from './abstract-card';

export class SpellCard extends AbstractCard {
  private _ability: AbstractAbility;

  constructor(name: string, ability: AbstractAbility) {
    super(name);
    this._ability = ability;
  }

  public get ablity() {
    return this._ability;
  }

  public set ability(ablitiy: AbstractAbility) {
    this._ability = ablitiy;
  }
}
