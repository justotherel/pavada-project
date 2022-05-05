import React, { useEffect, useState } from "react";
import { StringGenerator } from "../utils/cardgame-engine/helpers/string-generator";

import Card, { CardProps } from "./card";

// TODO: IMPLEMENT ROW SELECTION FOR CARD PLACEMENT (USE IDS)
// TODO: MAKE TEXT ON CARDS SCALABLE
// TODO: IMPLEMENT CARD PLACEMENT TO A SPECIFIC POSITION IN A ROW

interface BoardProps {
  meleeRowCards1?: CardProps[];
  rangeRowCards1?: CardProps[];
  meleeRowCards2?: CardProps[];
  rangeRowCards2?: CardProps[];
}

const melee: CardProps[] = [];

export default function Board(props: BoardProps) {
  const { meleeRowCards1, rangeRowCards1, meleeRowCards2, rangeRowCards2 } = props;

  const [rangeRow1, setRangeRow1] = useState<CardProps[]>([]);
  const [meleeRow1, setMeleeRow1] = useState<CardProps[]>([]);
  const [rangeRow2, setRangeRow2] = useState<CardProps[]>([]);
  const [meleeRow2, setMeleeRow2] = useState<CardProps[]>([]);

  const [hand, setHand] = useState<CardProps[]>(melee);

  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  useEffect(() => {
    if (meleeRowCards1) setMeleeRow1(meleeRowCards1);
    if (rangeRowCards1) setRangeRow1(rangeRowCards1);
    if (meleeRowCards2) setMeleeRow2(meleeRowCards2);
    if (rangeRowCards2) setRangeRow2(rangeRowCards2);
    setHand([
      { id: StringGenerator.getRandomString(12), name: "rayan gosling", health: 10, armor: 4 },
      { id: StringGenerator.getRandomString(12), name: "rayan gosling", health: 10, armor: 4 },
      { id: StringGenerator.getRandomString(12), name: "rayan gosling", health: 10, armor: 4 },
      { id: StringGenerator.getRandomString(12), name: "rayan gosling", health: 10, armor: 4 },
      { id: StringGenerator.getRandomString(12), name: "rayan gosling", health: 10, armor: 4 },
      { id: StringGenerator.getRandomString(12), name: "rayan gosling", health: 10, armor: 4 },
      { id: StringGenerator.getRandomString(12), name: "rayan gosling", health: 10, armor: 4 },
      { id: StringGenerator.getRandomString(12), name: "rayan gosling", health: 10, armor: 4 },
      { id: StringGenerator.getRandomString(12), name: "rayan gosling", health: 10, armor: 4 },
    ]);
  }, []);

  const handleClick = (e: React.MouseEvent): void => {
    console.log("handleClick called", selectedCard, e.button);

    if (e.button === 0 && selectedCard) {
      console.log("handleClick called and its an if statement");
      console.log(hand);
      const card = hand.find((card) => card.id === selectedCard);
      console.log(card);

      if (card) {
        const newRow = [...rangeRow1, card];
        setRangeRow1(newRow);
        setHand(hand.filter((cards) => cards != card));
      }
    }
  };

  const handleCardInHandClick = React.useCallback((id: string) => {
    console.log("handleCardInHandClick called");
    if (id) {
      setSelectedCard(id);
      console.log("handleCardInHandClick called and its an if statement");
    }
  }, []);

  return (
    <>
      <div className="bg-secondary rounded-2xl border-8 mx-auto border-primary flex flex-col min-h-[400px] xl:min-h-[650px] min-w-[650px] xl:min-w-[1000px] h-full ">
        <div
          className="w-full h-full flex space-x-2 mx-auto justify-center p-2 min-h-[110px] xl:min-h-[170px]"
          onClick={(e) => handleClick(e)}
        >
          {rangeRow1.map((card) => (
            <Card key={card.id} id={card.id} name={card.name} health={card.health} armor={card.armor} />
          ))}
        </div>
        <div className="border-2 border-primary"></div>
        <div className="w-full h-full flex space-x-2 mx-auto justify-center p-2 min-h-[110px] xl:min-h-[170px]">
          {meleeRow1.map((card) => (
            <Card key={card.id} id={card.id} name={card.name} health={card.health} armor={card.armor} />
          ))}
        </div>
        <div className="border-4 border-primary"></div>
        <div className="w-full h-full flex space-x-2 mx-auto justify-center p-2 min-h-[110px] xl:min-h-[170px]">
          {meleeRow2.map((card) => (
            <Card key={card.id} id={card.id} name={card.name} health={card.health} armor={card.armor} />
          ))}
        </div>
        <div className="border-2 border-primary"></div>
        <div className="w-full h-full flex space-x-2 mx-auto justify-center p-2 min-h-[110px] xl:min-h-[170px]">
          {rangeRow2.map((card) => (
            <Card key={card.id} id={card.id} name={card.name} health={card.health} armor={card.armor} />
          ))}
        </div>
      </div>
      <div className="inline-grid grid-cols-9 gap-2 mx-auto bg-dark rounded-md row-span-1 p-2">
        {hand.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            name={card.name}
            health={card.health}
            armor={card.armor}
            handleClick={() => handleCardInHandClick(card.id)}
          />
        ))}
      </div>
    </>
  );
}
