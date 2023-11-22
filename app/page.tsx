"use client";

export const dynamic = "force-dynamic";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`query {
  launchLatest {
    mission_name
  }
}`

export default function Page() {
  const { data } = useSuspenseQuery<{ launchLatest: { mission_name: string;}}>(query);

  return <div>{data.launchLatest.mission_name}</div>;
};