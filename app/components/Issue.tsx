export const Issue = (props: { title: string; cover: string }) => (
  <div className="m-2 w-40">
    <img
      src={props.cover}
      alt={`${props.title}-cover`}
      className="object-cover w-full h-full"
    />
    <div>{props.title}</div>
  </div>
);
