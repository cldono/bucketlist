import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const navLinkStyle = "text-slate-100 hover:text-blue-200";
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full font-medium">
        <ul className="flex bg-teal-900 py-5">
          <li className="mr-5 ml-2">
            <Link className={navLinkStyle} to="/">
              Home
            </Link>
          </li>
          <li className="mr-6">
            <Link className={navLinkStyle} to="/listExplorer">
              Your list
            </Link>
          </li>
          <li className="mr-6">
            <Link className={navLinkStyle} to="/listExplorer">
              Create events
            </Link>
          </li>
        </ul>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
