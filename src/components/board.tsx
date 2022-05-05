import { useEffect, useState } from "react";
import { StringGenerator } from "../utils/cardgame-engine/helpers/string-generator";

import Card, { CardProps } from "./card";

interface BoardProps {
  size: number;
}

interface BoardSideProps {
  meleeRowCards?: CardProps[];
  rangeRowCards?: CardProps[];
}

const melee: CardProps[] = [
  { name: "rayan gosling", health: 10, armor: 4 },
  { name: "rayan gosling", health: 10, armor: 4 },
  { name: "rayan gosling", health: 10, armor: 4 },
  { name: "rayan gosling", health: 10, armor: 4 },
  { name: "rayan gosling", health: 10, armor: 4 },
  { name: "rayan gosling", health: 10, armor: 4 },
  { name: "rayan gosling", health: 10, armor: 4 },
  { name: "rayan gosling", health: 10, armor: 4 },
];

function BoardSide(props: BoardSideProps) {
  const { meleeRowCards, rangeRowCards } = props;

  const [rangeRow, setRangeRow] = useState<CardProps[]>([]);
  const [meleeRow, setMeleeRow] = useState<CardProps[]>([]);

  useEffect(() => {
    if (meleeRowCards) setMeleeRow(meleeRowCards);
    if (rangeRowCards) setRangeRow(rangeRowCards);
  }, [meleeRowCards, rangeRowCards]);

  return (
    <>
      <div className="w-full h-full flex space-x-2 mx-auto justify-center p-2 min-h-[90px] xl:min-h-[150px]">
        {meleeRow.map((card) => (
          <Card
            key={StringGenerator.getRandomString(12)}
            name={card.name}
            health={card.health}
            armor={card.armor}
          />
        ))}
      </div>
      <div className="border-2 border-primary"></div>
      <div className="w-full h-full flex space-x-2 mx-auto justify-center p-2 min-h-[90px] xl:min-h-[150px]">
        {rangeRow.map((card) => (
          <Card
            key={StringGenerator.getRandomString(12)}
            name={card.name}
            health={card.health}
            armor={card.armor}
          />
        ))}
      </div>
    </>
  );
}

export default function Board(porps: BoardProps) {
  return (
    <div className="bg-secondary rounded-2xl border-8 mx-auto border-primary flex flex-col min-h-[400px] xl:min-h-[650px] min-w-[600px] xl:min-w-[900px] h-full aspect-[1.3/1]">
      <BoardSide  />
      <div className="border-4 border-primary"></div>
      <BoardSide />
    </div>
  );
}
