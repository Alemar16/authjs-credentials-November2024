import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white fixed bottom-0 w-full shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col items-center">
        <p className="text-sm">Creado con entusiasmo por Alemar16</p>
        <div className="flex space-x-4 mt-2">
          <a
            href="https://www.notion.so"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M4.459 4.208c0-.164.041-.164.204-.205l2.817-.573c.245 0 .327 0 .491.245l12.391 14.879c.163.204.082.245-.082.286l-2.78.61c-.245 0-.327 0-.49-.204l-5.655-6.814-1.473.982v5.655c0 .164 0 .245-.164.286l-3.002.655c-.163 0-.204-.041-.204-.205zm12.138 4.613l-3.125-.654-3.614 3.287 3.205 3.614 3.573-.653c.164 0 .164-.206.164-.287z" />
            </svg>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 .296C5.373.296 0 5.67 0 12.297c0 5.283 3.438 9.75 8.207 11.333.6.112.793-.26.793-.577v-2.024c-3.34.725-4.037-1.41-4.037-1.41-.546-1.385-1.332-1.754-1.332-1.754-1.086-.744.083-.729.083-.729 1.205.084 1.84 1.257 1.84 1.257 1.07 1.835 2.807 1.305 3.494.998.108-.775.418-1.305.76-1.604-2.665-.304-5.467-1.334-5.467-5.933 0-1.312.468-2.388 1.237-3.227-.124-.306-.536-1.531.117-3.188 0 0 1.009-.322 3.301 1.23a11.51 11.51 0 0 1 3.003-.403c1.018.004 2.045.138 3.003.403 2.291-1.553 3.299-1.23 3.299-1.23.653 1.657.241 2.882.118 3.188.77.839 1.236 1.915 1.236 3.227 0 4.609-2.803 5.625-5.473 5.926.43.374.812 1.106.812 2.228v3.293c0 .319.193.694.801.576C20.564 22.046 24 17.578 24 12.296c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
