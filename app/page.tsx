
import { getClient } from "@/lib/client";

import { gql } from "@apollo/client";

export const revalidate = 5;

const query = gql`query {
  launchLatest {
    mission_name
  }
}`

export default async function Page() {
  const client = getClient();
  const { data } = await client.query({ query });
  return <div>{data.launchLatest.mission_name}</div>;
}