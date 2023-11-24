import Link from "next/link";
import { Issue } from "./Issue";
export const PublicationList = (props: {
  publications: Array<{ name: string; id: number; cover: string }>;
}) => (
  <ul
    className="flex overflow-x-auto mt-4 p-4"
  >
    {props.publications.map((publication) => (
      <li key={publication.id} className="hover:scale-125">
        <Link href={`/publication/${publication.id}`}>
          <Issue title={publication.name} cover={publication.cover} />{" "}
        </Link>
      </li>
    ))}
  </ul>
);
