import { PublicationList } from "./PublicationList";
export const Category = (props: {
  name: string;
  image: string;
  publications: Array<{ id: number; name: string; cover: string }>;
}) => {
  return (
    <div>
      <div className="text-xl">{props.name}</div>
      <PublicationList publications={props.publications} />
    </div>
  );
};
