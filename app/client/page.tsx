"use client";

export const dynamic = "force-dynamic";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`query {
  launchLatest {
    mission_name
  }
}`

export default function PollPage() {
  const { data } = useSuspenseQuery<any>(query);

  return <div>{data.launchLatest.mission_name}</div>;
};