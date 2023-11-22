"use client";

export const dynamic = "force-dynamic";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`query Myquery {
  hello
}
`

export default function Page() {
  const { data } = useSuspenseQuery<{ hello: string;}>(query);

  return <div>{data.hello}</div>;
};