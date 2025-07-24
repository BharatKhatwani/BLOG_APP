import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Navbar session={session} />
        <main className="max-w-screen-xl mx-auto px-5 py-6">{children}</main>
      </body>
    </html>
  );
}
