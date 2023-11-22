import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";
import { getStorefrontLists } from "@/lib/api-calls";

const typeDefs = `
#type Publication {

#}
type Storefront {
  id: Int!
  name: String!
  description: String
  platform: String
  storefront_list_code: String
}
  type Query {
    storefronts(platform: String!): [Storefront!]
  }
`;
const resolvers = {
  Query: {
    storefronts: async (
      parent: null,
      args: any,
      contextValue: any,
      info: any,
    ) => getStorefrontLists(args.platform),
    /*Storefront: (parent) => {

    }*/
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
