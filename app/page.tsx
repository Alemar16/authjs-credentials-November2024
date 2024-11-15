import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center p-8 bg-gray-100 ">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 space-y-8 ">
        <div className="text-center">
          <h1 className="text-4xl font-bold mt-20 mb-14">
            The NextJS + Auth.js Application
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative group">
            <div
              className="absolute inset-0 bg-cover bg-center rounded-lg shadow-md"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499673610122-01c7122c5dcb?q=80&w=1027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              }}
            ></div>
            <div className="relative p-6 rounded-lg shadow-md flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
              <img
                src="/images/nextjs.svg"
                alt="Next.js Logo"
                className="w-32 h-20 mb-2"
              />
              <h2 className="text-2xl font-semibold mb-8">Next.js</h2>
              <p className="text-lg text-center mb-4">
                Next.js is a React framework that enables several extra
                features, including server-side rendering and generating static
                websites.
              </p>
              <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-16 bg-black bg-opacity-75 transition-all duration-300 ease-in-out overflow-hidden">
                <Link
                  href="https://nextjs.org/"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Explore Next.js
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div
              className="absolute inset-0 bg-cover bg-center rounded-lg shadow-md"
              style={{
                backgroundImage:
                  "url('https://plus.unsplash.com/premium_photo-1701179596614-9c64f50cda76?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              }}
            ></div>

            <div className="relative p-6 rounded-lg shadow-md flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
              <img
                src="/images/authjs.svg"
                alt="Next.js Logo"
                className="w-32 h-20 mb-2"
              />
              <h2 className="text-2xl font-semibold mb-8">Auth.js</h2>
              <p className="text-lg text-center mb-4">
                Auth.js provides authentication utilities easy to integrate with
                various providers and custom setups.
              </p>
              <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-16 bg-black bg-opacity-75 transition-all duration-300 ease-in-out overflow-hidden">
                <Link
                  href="https://authjs.dev/"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Button className="bg-green-500 text-white px-4 py-2 rounded">
                    Explore Auth.js
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">
            Functionality Test Instructions
          </h2>
          <p className="mb-4">
            This website serves as a demonstrative guide, utilizing advanced
            technologies previously mentioned to facilitate comprehensive
            functionality testing and code review.
          </p>
          <p className="mb-8">
            Here, developers will have the opportunity to observe the
            performance and capabilities of the framework and library in action,
            allowing them to evaluate their integration into future projects.
          </p>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Make Tests
            </h2>
            <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-center">
                <div className="w-full md:w-3/4">
                  <p className="text-lg font-semibold mb-2">Register</p>
                  <p>
                    Users register and gain the role of "user", which grants
                    them access to the dashboard content.
                  </p>
                </div>
                <div className="w-full md:w-1/4 mt-4 md:mt-0 flex justify-end">
                  <Link href="/register">
                    <Button className="bg-green-500 text-white px-4 py-2 rounded">
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-center">
                <div className="w-full md:w-3/4">
                  <p className="text-lg font-semibold mb-2">Sign In</p>
                  <p>
                    Registered users can log in to continue exploring the
                    allowed functionalities.
                  </p>
                </div>
                <div className="w-full md:w-1/4 mt-4 md:mt-0 flex justify-end">
                  <Link href="/login">
                    <Button className="bg-blue-500 text-white px-4 py-2 rounde">
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
