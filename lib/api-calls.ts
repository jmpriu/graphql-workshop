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
        return response.access_token;
      });
  }
  return tokenResponse;
};
export const getStorefrontLists = async (
  platform = "web",
): Promise<
  Array<{
    id: number;
    newsstand_id: number;
    storefront_list_code: string;
    name: string;
    description: string;
    platform: "web" | "android" | "ios";
    type: string;
    position: number;
    created_at: string;
    modified_at: string;
  }>
> => {
  const token = await getToken();
  return fetch(
    `${process.env.API_URL}/newsstand/v2/newsstands/101/storefronts?type=home&platform=${platform}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
    .then((response) => response.json())
    .then((response) =>
      (
        response.data as Array<{
          id: number;
          newsstand_id: number;
          storefront_list_code: string;
          name: string;
          description: string;
          platform: "web" | "android" | "ios";
          type: string;
          position: number;
          created_at: string;
          modified_at: string;
        }>
      )
        .filter((s) => s.name !== null)
        .sort((a, b) => a.position - b.position),
    );
};
