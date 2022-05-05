import type { NextPage } from "next";
import Board from "../components/board";


const Sandbox: NextPage = () => {
  return (
    <main className="h-screen text-center overflow-hidden mx-auto bg-dark">
      <div className="flex flex-col">
        <Board/>
      </div>
    </main>
  );
};

export default Sandbox;
