

import { BoardSides } from './board-sides';
import { Rows } from './rows';
import { UnitCard } from './unit-card';

export interface ActionContext {
  side: BoardSides;
  row: Rows;
  position: number;
  card: UnitCard;
}
