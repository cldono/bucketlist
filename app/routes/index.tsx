import { Link } from "@remix-run/react";
import { buttonStyle } from "~/utils/helpers";

export default function Index() {
  return (
    <div className="mt-10 flex h-full w-full flex-col content-center items-center gap-10 font-medium">
      <text className="w-full text-center text-6xl">Let's go places</text>
      <text className="text-xl">
        A place to sort and manage your bucket list.
      </text>
      <Link className={buttonStyle} to="/listExplorer">
        Explore your list
      </Link>
    </div>
  );
}
