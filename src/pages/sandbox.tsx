import type { NextPage } from "next";

import Board from "../components/board";
import Card from "../components/card";

const h = (
  <>
    <Card name="rayan gosling" health={10} armor={4} />
    <Card name="rayan gosling" health={10} armor={4} />
    <Card name="rayan gosling" health={10} armor={4} />
    <Card name="rayan gosling" health={10} armor={4} />
    <Card name="rayan gosling" health={10} armor={4} />
    <Card name="rayan gosling" health={10} armor={4} />
    <Card name="rayan gosling" health={10} armor={4} />
    <Card name="rayan gosling" health={10} armor={4} />
    <Card name="rayan gosling" health={10} armor={4} />
  </>
);

const Sandbox: NextPage = () => {
  return (
    <main className="h-screen text-center overflow-hidden mx-auto bg-dark">
      <div className="flex flex-col">
        <Board size={9} />
        <div className="inline-grid grid-cols-9 gap-2 mx-auto bg-dark rounded-md row-span-1 p-2">
          {h}
        </div>
      </div>
    </main>
  );
};

export default Sandbox;
