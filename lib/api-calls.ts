let tokenResponse: Promise<string> | null = null;
const getToken = async (): Promise<string> => {
  if (!tokenResponse) {
    tokenResponse = fetch(`${process.env.API_URL}/oauth/v2/tokens`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        client_id: `${process.env.CLIENT_ID}`,
        client_secret: process.env.CLIENT_SECRET!,
        grant_type: "client_credentials",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        return response.access_token as string;
      });
  }
  return tokenResponse;
};

export type Category = {
  id: number;
  project_id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
  remote_identifier: string;
  parent_id: number;
  status: number;
  priority: number;
  children: Array<unknown>;
  no_of_publications: number;
  content_rating: number;
};
export const getCategories = async (): Promise<Array<Category>> => {
  const token = await getToken();
  return fetch(
    `${process.env.API_URL}/newsstand/v2/newsstands/115/categories?status=1`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
    .then((response) => response.json())
    .then((response) => response.data);
};
export const getPublicationById = async (id:number): Promise<CatalogPublication> => {
  const token = await getToken();
  return fetch(
    `${process.env.API_URL}/catalog/v2/publications/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
    .then((response) => response.json())
    .then((response) => response.data);
};
export const getPublisherOfPublication = async (id: number): Promise<Publisher> => {
  const token = await getToken();
  const publication = await getPublicationById(id);

  return fetch(
    `${process.env.API_URL}/catalog/v2/publishers/${publication.publisher_id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
    .then((response) => response.json())
    .then((response) => response.data);
  
}

export type Publication = {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  image: string;
  content_rating: number;
  status: 1;
  slug: string;
  parent_id: number;
  thumbnail: {
    url: string;
  };
};
export const getCategoryItem = async (
  categoryCode: string,
): Promise<Array<Publication>> => {
  const token = await getToken();
  return fetch(
    `${process.env.API_URL}/newsstand/v2/compact_lists?newsstand_id=115&code=${categoryCode}&limit=5`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
    .then((response) => response.json())
    .then((response) =>
      response.data.items.filter(
        (item: Publication) => item.type === "publication" && item.status === 1,
      ),
    );
};
export type Publisher = {
  id: string;
  name: string;
  internal_name: string;
  description: string;
  slug: string;
};

export const getPublisherById = async (
  publisherId: number,
): Promise<Publisher> => {
  const token = await getToken();
  return fetch(`${process.env.API_URL}/catalog/v2/publishers/${publisherId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((response) => response.data);
};
export type CatalogPublication = {
  id: number;
  name: string;
  internal_name: string;
  description: string;
  publisher_id: number;
  latest_issue: {
    cover_image: string;
    cover_date: string;
  };
};
export const getPublicationsByPublisherId = async (
  publisherId: number | string,
): Promise<CatalogPublication[]> => {
  const token = await getToken();
  return fetch(
    `${process.env.API_URL}/catalog/v2/publications?publisher_id=${publisherId}&limit=10&sort=-id`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
    .then((response) => response.json())
    .then((response) => response.data);
};
export interface Issue {
  id: number;
  publication_id: number;
  name: string;
  internal_name: string;
  cover_image: string;
  cover_date: string;
}
export const getIssuesByPublicationId = async (
  publicationId: string | number,
): Promise<Array<Issue>> => {
  const token = await getToken();
  return fetch(
    `${process.env.API_URL}/catalog/v2/issues?publication_id=${publicationId}&limit=10&sort=-id`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
    .then((response) => response.json())
    .then((response) => response.data);
};
