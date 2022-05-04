import type { NextPage } from 'next';
import 'tailwindcss/tailwind.css';
import Card from '../components/card';

const range1 = (
  <>
    <Card name="placeholder" health={10} armor={4} />
    <Card name="rayan gosling" health={10} armor={4} />
    <Card name="placeholder" health={10} armor={4} />
    <Card name="placeholder" health={10} armor={4} />
    <Card name="rayan gosling" health={10} armor={4} />
    <Card name="placeholder" health={10} armor={4} />
    <Card name="rayan gosling" health={10} armor={4} />
    <Card name="placeholder" health={10} armor={4} />
    <Card name="rayan gosling" health={10} armor={4} />
  </>
);

const meele1 = (
  <>
    <Card name="rayan gosling" health={10} armor={4} />
    <Card name="placeholder" health={10} armor={4} />
    <Card name="placeholder" health={10} armor={4} />
    <Card name="rayan gosling" health={10} armor={4} />
    <Card name="placeholder" health={10} armor={4} />
    <Card name="rayan gosling" health={10} armor={4} />
    <Card name="placeholder" health={10} armor={4} />
    <Card name="rayan gosling" health={10} armor={4} />
    <Card name="rayan gosling" health={10} armor={4} />
  </>
);

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

const Sanbbox: NextPage = () => { 
  return (
    <div className="box-border">
      <main className="h-screen text-center overflow-hidden mx-auto bg-dark">
        <div className="mx-auto p-4 h-full aspect-square flex flex-col justify-between">
          <div className="inline-grid grid-cols-9 gap-2 mx-auto bg-dark rounded-md row-span-1 p-2">{h}</div>
          <div className="bg-secondary rounded-2xl row-span-4 border-8 border-primary inline-block">
            <div className="inline-block w-full">
              <div className="inline-grid w-full grid-cols-9 gap-2 mx-auto p-2">{range1}</div>
              <div className="border-2 border-primary"></div>
              <div className="inline-grid w-full grid-cols-9 gap-2 mx-auto p-2">{meele1}</div>
            </div>
            <div className="border-4 border-primary"></div>
            <div className="inline-block w-full">
              <div className="inline-grid w-full grid-cols-9 gap-2 mx-auto p-2">{range1}</div>
              <div className="border-2 border-primary"></div>
              <div className="inline-grid w-full grid-cols-9 gap-2 mx-auto p-2">{meele1}</div>
            </div>
          </div>
          <div className="inline-grid grid-cols-9 gap-2 mx-auto bg-dark rounded-md row-span-1 p-2">{h}</div>
        </div>
      </main>
    </div>
  );
};

export default Sanbbox;
