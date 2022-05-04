import { SpellCard } from './spell-card';
import { UnitCard } from './unit-card';

export abstract class AbstractAbility {
  private _canCastOnSelf: boolean;
  private _requiresTarget: boolean;
  protected _cooldown: number;

  constructor(canCastOnSelf: boolean, requiresTarget: boolean, cooldown = 0) {
    this._canCastOnSelf = canCastOnSelf;
    this._requiresTarget = requiresTarget;
    this._cooldown = cooldown;
  }

  public get canCastOnSelf() {
    return this._canCastOnSelf;
  }

  public get requiresTarget() {
    return this._requiresTarget;
  }

  public get cooldown() {
    return this._cooldown;
  }

  public set cooldown(value: number) {
    this._cooldown = value
  }

  public abstract cast(): void;

  public abstract cast(target: UnitCard): void;

  public abstract cast(target: UnitCard[]): void;
}
