import { Link } from "@remix-run/react";

export default function Index() {

  return (
    <div
      className="flex flex-col bg-blue-100"
      style={{ height: "100%", width: "100%" }}
    >
      <text className="text-xl">Welcome, let's work on your bucket list!</text>
      <text className="text-large">
        Homepage here to talk about reasoning for app
      </text>
      <Link to="/listExplorer">Explore my list</Link>
    </div>
  );
}
