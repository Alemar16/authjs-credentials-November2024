import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl mb-4">
        Welcome to the NextJS + Auth.js Application
      </h1>
      <p className="text-md mb-4">
        Next.js is a React framework that enables several extra features,
        including server-side rendering and generating static websites.{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Learn more
        </a>
      </p>
      <p className="text-md mb-8">
        Auth.js provides authentication utilities easy to integrate with various
        providers and custom setups.{" "}
        <a
          href="https://authjs.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Learn more
        </a>
      </p>

      <div className="flex flex-col items-center justify-center">
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl mb-4">Make Tests</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-lg mb-2">Register</p>
              <Link href="/register">
                <Button className="bg-green-500 text-white px-4 py-2 rounded">
                  Go to Register
                </Button>
              </Link>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-lg mb-2">Sign In</p>
              <Link href="/login">
                <Button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Go to Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-8">
        <p>Created with enthusiasm by Alemar16</p>
      </footer>
    </div>
  );
}
