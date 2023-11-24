"use client";

export const dynamic = "force-dynamic";

import { IssueList } from "@/app/components/IssueList";
import { PublicationList } from "@/app/components/PublicationList";
import { Title } from "@/app/components/Title";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`
  query publicationData {
    getPublication {
      name
      issues {
        id
        cover
        name
      }
      description
    }
    getPublisherOfPublication {
      name
      publications {
        name
        cover
        id
      }
    }
  }
`;

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { data } = useSuspenseQuery<{
    getPublication: {
      name: string;
      description: string;
      issues: Array<{
        id: number;
        cover: string;
        name: string;
      }>;
    };
    getPublisherOfPublication: {
      name: string;
      publications: Array<{
        name: string;
        cover: string;
        id: number;
      }>;
    };
  }>(query);

  return (
    <div className="container mx-auto">
      <div>
        <Title title={`${data.getPublication.name} - ${id}`} />
        <p>{data.getPublication.description}</p>
        <div className="text-xl">Recent Issues</div>
        <IssueList issues={data.getPublication.issues} />
      </div>
      <div>
        <div className="text-xl">More publications about {data.getPublisherOfPublication.name}</div>
        <PublicationList publications={data.getPublisherOfPublication.publications} />
      </div>
    </div>
  );
}
