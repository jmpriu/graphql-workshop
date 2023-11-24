import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import {
  Category,
  getCategories,
  getCategoryItem,
  getIssuesByPublicationId,
  getPublicationById,
  getPublicationsByPublisherId,
  getPublisherById,
  getPublisherOfPublication,
} from "@/lib/api-calls";
import typeDefs from "./type-defs.graphql";
type PublicationResolver = {
  id: number;
  name: string;
  description: string;
  cover: string;
  slug: string;
  issues: [];
  publisher: number;
};
type IssueResolver = {
  id: number;
  name: string;
  cover: string;
};
type PublisherResolver = {
  id: number;
  name: string;
  publications: Array<any>;
};
const resolvers = {
  Category: {
    publications: (
      parent: Category,
      args: any,
      contextValue: any,
      info: any,
    ): Promise<PublicationResolver[]> => {
      return getCategoryItem(parent.slug).then((publications) =>
        publications.map((c) => ({
          id: c.id,
          name: c.title,
          description: "",
          cover: c?.thumbnail?.url ?? "",
          slug: c.slug,
          issues: [],
          publisher: c.parent_id,
        })),
      );
    },
  },
  Publication: {
    issues: (parent: PublicationResolver): Promise<IssueResolver[]> => {
      return getIssuesByPublicationId(parent.id).then((issues) =>
        issues.map((issue) => ({
          id: issue.id,
          name: issue.name,
          cover: issue.cover_image ?? "",
        })),
      );
    },
    // Removed to show more queries
    // publisher: (parent: PublicationResolver): Promise<PublisherResolver> => {
    //   return getPublisherById(parent.publisher).then((publisher) => ({
    //     id: +publisher.id,
    //     name: publisher.name,
    //     publications: [],
    //   }));
    //   // return { id: parent.publisher, name: "H", publications: [] };
    // },
  },
  Publisher: {
    publications: (parent: PublisherResolver): Promise<PublicationResolver[]> => getPublicationsByPublisherId(parent.id).then(publications => publications.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      cover: c?.latest_issue?.cover_image,
      slug: "",
      issues: [],
      publisher: parent.id,
    }))),
  },

  Query: {
    getCategories: async (
      parent: null,
      args: any,
      contextValue: any,
      info: any,
    ) => getCategories(),
    getPublication: (publicationId = 10661): Promise<PublicationResolver> =>
      getPublicationById(publicationId).then((c) => ({
        id: c.id,
        name: c.name,
        description: c.description,
        cover: c?.latest_issue?.cover_image,
        slug: "",
        issues: [],
        publisher: c.publisher_id,
      })),
    getPublisherOfPublication: (publicationId = 10661): Promise<PublisherResolver> =>
      getPublisherOfPublication(publicationId).then((publisher) => ({
        id: +publisher.id,
        name: publisher.name,
        publications: [],
      })),
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
