"use client";

export const dynamic = "force-dynamic";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Title } from "./components/Title";
import { Category } from "./components/Category";

const query = gql`
  query categoryList {
    getCategories {
      name
      image
      slug
      publications {
        id
        name
        cover
      }
    }
  }
`;

export default function Page() {
  const { data } = useSuspenseQuery<{
    getCategories: Array<{
      name: string;
      slug: string;
      image: string;
      publications: Array<{ id: number; name: string; cover: string }>;
    }>;
  }>(query);

  return (
    <div className="container mx-auto">
      <Title title="Best content!" />
      <ul className="list-none">
        {data.getCategories.map((category) => (
          <li key={category.slug}>
            <Category {...category} />
          </li>
        ))}
      </ul>
    </div>
  );
}
