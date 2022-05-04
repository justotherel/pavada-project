import { TurnPhases } from './turn-phases';
import { AbstractAbility } from './abstract-ablity';
import { AbstractCard } from './abstract-card';

export interface UnitCardProps {
  name: string;
  health: number;
  armor?: number;
  ability?: AbstractAbility;
  team: TurnPhases;
}

export class UnitCard extends AbstractCard {
  private _health: number;
  private _currentHealth: number;
  private _armor: number;
  private _abilities: AbstractAbility[] | null;
  private _team: TurnPhases;

  constructor(props: UnitCardProps) {
    const { name, health, armor = 0, ability = null, team } = props;
    super(name);
    this.health = health;
    this.armor = armor;
    this._abilities = [ability];
    this._team = team;
  }

  public addAbility(ability: AbstractAbility) {
    this.abilities.push(ability);
  }

  public get team(): TurnPhases {
    return this._team;
  }
  public set team(value: TurnPhases) {
    this._team = value;
  }

  public set armor(value: number) {
    if (value >= 0) this._armor = value;
  }

  public set health(value: number) {
    if (value >= 0) this._health = value;
  }

  public set currentHealth(value: number) {
    if (value >= 0) this._currentHealth = value;
  }

  public get armor() {
    return this._armor;
  }

  public get health() {
    return this._health;
  }

  public get currentHealth() {
    return this._currentHealth;
  }

  public set abilities(ablitiy: AbstractAbility[]) {
    this._abilities = ablitiy;
  }

  public get ablities() {
    return this._abilities;
  }
}
