"use client";

export const dynamic = "force-dynamic";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`
  query Storefronts($platform: String!) {
    storefronts(platform: $platform) {
      name
      storefront_list_code
    }
  }
`;

export default function Page() {
  const { data } = useSuspenseQuery<{
    storefronts: Array<{
      id: number;
      name: string;
      storefront_list_code: string;
    }>;
  }>(query, { variables: { platform: "web" } });

  return (
    <ul>
      {data.storefronts.map((storefront) => (
        <li key={storefront.id}>
          {storefront.name} - {storefront.storefront_list_code}
        </li>
      ))}
    </ul>
  );
}
