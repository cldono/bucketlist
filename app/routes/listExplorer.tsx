import { Link, useLoaderData, Outlet } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  getAllEvents,
  updateEventCompleted,
} from "~/models/listExplorer.server";
import { months, buttonStyle } from "../utils/helpers";
import EventsTable from "~/components/EventsTable";

type LoaderData = {
  events: Awaited<ReturnType<typeof getAllEvents>>;
};

function translateSearchTerm(column: string | null, searchTerm: string | null) {
  if (column === "dateMonth") {
    return months().indexOf(searchTerm || "") + 1;
  } else if (column === "dateYear") {
    return parseInt(searchTerm || "0");
  } else {
    return searchTerm;
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const sortBy = url.searchParams.get("sortBy");
  const column = url.searchParams.get("searchColumn");
  const searchTerm = url.searchParams.get("searchTerm");
  return json<LoaderData>({
    events: await getAllEvents(
      sortBy || "id",
      column,
      translateSearchTerm(column?.toString(), searchTerm)
    ),
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  let { _action, ...values } = Object.fromEntries(formData.entries());

  if (_action === "toggleCompleted") {
    const id = parseInt(values.id.toString());
    updateEventCompleted(id, values.completed === "true");
    return redirect(`/listExplorer`);
  }
};

const cellClass = "py-3 px-6";

export default function ListExplorer() {
  const { events } = useLoaderData() as LoaderData;

  return (
    <div>
      <div className="flex items-center gap-5">
        <EventsTable events={events} />
        <Outlet />
      </div>
      <div className="mt-20 flex flex-col items-center">
        <Link className={buttonStyle} to="new">
          Add to your bucket list
        </Link>
      </div>
    </div>
  );
}
