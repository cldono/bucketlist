import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Link } from "@remix-run/react";
import {
  formatDate,
  formatLocation,
  renderCompletedForm,
} from "~/utils/helpers";

import type { BucketListEvent } from "~/models/listExplorer.server";
import { getEvent, updateEventCompleted } from "~/models/listExplorer.server";

type LoaderData = { event: BucketListEvent };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.eventId, `Event ID is required`);

  const event = await getEvent(parseInt(params.eventId));
  invariant(event, `Event not found: ${params.eventId}`);

  return json<LoaderData>({ event });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  let { _action, ...values } = Object.fromEntries(formData.entries());

  if (_action === "toggleCompleted") {
    const id = parseInt(values.id);
    updateEventCompleted(id, values.completed === "true");
    return redirect(`/listExplorer/${id}`);
  }
};

export default function EventId() {
  const { event } = useLoaderData() as LoaderData;

  const labelClass = `block uppercase tracking-wide text-gray-700 text-s font-bold mb-1`;
  const textClass = `block tracking-wide text-gray-700 text-s mb-1`;
  return (
    <main className="mx-auto flex h-fit w-1/2 flex-col rounded bg-gray-50 p-4">
      <Link className="text-bold text-right" to="/listExplorer">
        X
      </Link>
      <h3 className="my-6 border-b-2 text-center text-2xl font-semibold">
        {event.name}
      </h3>
      <div className="flex gap-x-1">
        <label className={labelClass}>Date: </label>
        <text className={textClass}>
          {formatDate(event.dateMonth, event.dateYear)}
        </text>
      </div>
      <div className="flex gap-x-1">
        <label className={labelClass}>Location: </label>
        <text className={textClass}>
          {formatLocation(event.state, event.country)}
        </text>
      </div>
      <div className="flex gap-x-1">
        <label className={labelClass}>Category: </label>
        <text className={textClass}>{event.category}</text>
      </div>
      <div className="flex gap-x-1">
        <label className={labelClass}>Details: </label>
        <text className={textClass}>{event.name}</text>
      </div>
      <div className="flex gap-x-1">
        <label className={labelClass}>Completed? </label>
        {renderCompletedForm(event.id, event.completed)}
      </div>
    </main>
  );
}
