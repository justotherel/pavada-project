interface CardProps {
  name: string;
  health: number;
  armor?: number;
}

export default function Card(props: CardProps) {
  const card = (
    <div className=" border-auxilary border-4 rounded-lg shadow-md shawod-black aspect-[1/1.5] hover:transition-transform hover:scale-110 min-h-[150px] md:min-h-[100px]">
      <div className="bg-rayan-gosling bg-no-repeat bg-cover shadow-xl relative h-full w-full">
        <div className="absolute left-1 text-center">
          <p className="text-red-700 font-extrabold text-2xl">{props.health}</p>
          <p className="text-white font-extrabold text-2xl mt-[-10px]">
            {props.armor}
          </p>
        </div>
      </div>
    </div>
  );

  const placeholder = (
    <div className="border-4 border-auxilary border-dashed rounded-lg min-h-[150px] md:min-h-[100px] h-full aspect-[1/1.5]"></div>
  );

  return <>{props.name !== "placeholder" ? card : placeholder}</>;
}
