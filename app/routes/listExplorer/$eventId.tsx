import { marked } from "marked";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Link } from "@remix-run/react";

import type { BucketListEvent } from "~/models/listExplorer.server";
import { getEvent } from "~/models/listExplorer.server";

type LoaderData = { event: BucketListEvent };

const MONTHS = [ "January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December" ];


function formatLocation(state: string | null, country: string | null) {
    if (state && country) {
        return `${state}, ${country}`
    } 
    return `${state || ""}${country || ""}`
}

function formatDate(month: number | null, year: number | null) {
    if (!month || !year) {
        return "";
    }

    return `${MONTHS[month-1]} ${year}`
}

export const loader: LoaderFunction = async ({
  params,
}) => {
  invariant(params.eventId, `params.eventId is required`);

  const event = await getEvent(parseInt(params.eventId));
  invariant(event, `Post not found: ${params.eventId}`);

//   const html = marked(post.markdown);
  return json<LoaderData>({ event });
};

export default function EventId() {
  const { event } = useLoaderData() as LoaderData;

  const labelClass = `block uppercase tracking-wide text-gray-700 text-s font-bold mb-1`;
  const inputClass = `block tracking-wide text-gray-700 text-s mb-1`;
//   const inputClass = `block w-full text-gray-700mb-3 leading-tight text-s`

  return (
 
    <main className="mx-auto w-1/2">
        <Link to="/listExplorer">Exit</Link>
      <h3 className="text-base my-6 border-b-2 text-center text-3xl">
        {event.name}
      </h3>
        {/* <div className="flex gap-x-1">
            <label className={labelClass}>Event: </label>
            <text className={inputClass}>{event.name}</text>
        </div> */}
        <div className="flex gap-x-1">
            <label className={labelClass}>Date: </label>
            <text className={inputClass}>{formatDate(event.dateMonth, event.dateYear)}</text>
        </div>
        <div className="flex gap-x-1">
            <label className={labelClass}>Location: </label>
            <text className={inputClass}>{formatLocation(event.state, event.country)}</text>
        </div>
        <div className="flex gap-x-1">
            <label className={labelClass}>Details: </label>
            <text className={inputClass}>{event.name}</text>
        </div>
    </main>
  );
}