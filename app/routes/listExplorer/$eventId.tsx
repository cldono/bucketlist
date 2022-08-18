import { marked } from "marked";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Link } from "@remix-run/react";
import { inputClass, formatDate, formatLocation, renderCompletedForm } from "~/utils/helpers"

import type { BucketListEvent } from "~/models/listExplorer.server";
import { getEvent, updateEventCompleted } from "~/models/listExplorer.server";

type LoaderData = { event: BucketListEvent };

export const loader: LoaderFunction = async ({
  params,
}) => {
  invariant(params.eventId, `params.eventId is required`);

  const event = await getEvent(parseInt(params.eventId));
  invariant(event, `Post not found: ${params.eventId}`);

  return json<LoaderData>({ event });
};

export const action: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();
  let {_action, ...values} = Object.fromEntries(formData.entries())
  
  if (_action === "toggleCompleted") {
    const id = parseInt(values.id)
    updateEventCompleted(id, values.completed === "true")
    return redirect(`/listExplorer/${id}`);
  }  
};

export default function EventId() {
  const { event } = useLoaderData() as LoaderData;

  const labelClass = `block uppercase tracking-wide text-gray-700 text-s font-bold mb-1`;
  
//   const inputClass = `block w-full text-gray-700mb-3 leading-tight text-s`

  return (
 
    <main className="flex flex-col mx-auto w-1/2 bg-zinc-200 rounded h-fit p-4">
        <Link className="text-right text-bold"to="/listExplorer">X</Link>
      <h3 className="font-semibold my-6 border-b-2 text-center text-2xl">
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
            <label className={labelClass}>Category: </label>
            <text className={inputClass}>{event.category}</text>
        </div>
        <div className="flex gap-x-1">
            <label className={labelClass}>Details: </label>
            <text className={inputClass}>{event.name}</text>
        </div>
        <div className="flex gap-x-1">
            <label className={labelClass}>Completed? </label>
            
            { renderCompletedForm(event.id, event.completed)}
            {/* <Form method="post">
              <input type="hidden" name="id" value={event.id}/>
              <input type="hidden" name="completed" value={(!event.completed).toString()}></input>
              <button type="submit" name="_action" value="toggleCompleted">
                <text className={inputClass}>{event.completed ? "✅" : "❌"}</text>
              </button>
            </Form> */}
        </div>
    </main>
  );
}