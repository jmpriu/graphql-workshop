import { ApolloWrapper } from "@/lib/apollo-provider";
import { Dynamic } from "./components/Dynamic";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Dynamic>
          <ApolloWrapper>{children}</ApolloWrapper>
        </Dynamic>
      </body>
    </html>
  );
}
