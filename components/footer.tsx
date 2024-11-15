import React from "react";

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
            <img src="/images/notion.svg" alt="Notion" className="w-6 h-6" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <img src="/images/github.svg" alt="Notion" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
