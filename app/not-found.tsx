import { Button } from "@/components/ui/button";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen  px-4 text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </p>
      <p className="text-gray-500 mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link href="/" passHref>
        <Button className="text-sm px-6 py-2 rounded-md cursor-pointer">Go to Home</Button>
      </Link>
    </div>
  );
}

export default NotFound;
