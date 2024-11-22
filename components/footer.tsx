import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white bottom-0 w-full shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-row  items-center justify-between">
        <p className="text-sm">Creado con entusiasmo por Alemar16</p>
        <div className="flex space-x-4 mt-2">
          <a
            href="https://www.notion.so"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <Image
              src="/images/notion.svg"
              alt="Notion"
              width={24}
              height={24}
              priority={false}
            />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <Image
              src="/images/github.svg"
              alt="GitHub"
              width={24}
              height={24}
              priority={false}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
