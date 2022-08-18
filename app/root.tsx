import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
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
import { getUser } from "./session.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <ul className="flex bg-blue-700 py-5">
          <li className="mr-6">
            <Link className="text-slate-100 hover:text-blue-800" to="/">
              Home
            </Link>
          </li>
          <li className="mr-6">
            <Link
              className="text-slate-100 hover:text-blue-800"
              to="/listExplorer"
            >
              Your list
            </Link>
          </li>
          <li className="mr-6">
            <Link
              className="text-slate-100 hover:text-blue-800"
              to="/listExplorer"
            >
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
