import { PublicationList } from "./PublicationList";

export const Category = (props: {
  name: string;
  image: string;
  publications: Array<{ id: number; name: string; cover: string }>;
}) => {
  return (
    <div>
      {/* <div className="relative w-full h-10 overflow-hidden">
        <img
          src={props.image}
          alt="Category-image"
          className="object-cover w-full h-full"
        />
        <div className="absolute w-full py-2.5 bottom-0 inset-x-0 text-white text-xl text-left leading-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {props.name}
        </div>
      </div> */}
      <div className="text-xl">{props.name}</div>
      <PublicationList publications={props.publications} />
    </div>
  );
};
