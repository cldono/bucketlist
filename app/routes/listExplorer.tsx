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
      {/* <div className="inline-flex rounded-md shadow-sm" role="group">
        <button type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            Profile
        </button>
        <button type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            Settings
        </button>
        <button type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            Messages
        </button>
        </div> */}
      {/* <form>
                <div className="flex flex-row gap-3 align-center">
                    <label className="flex-none">Filter your list:</label>
                    <select className="flex-none" name="searchColumn" id="cars">
                        <option  className={inputClass} key={"first"}></option>
                        {COLUMN_HEADERS.map((header) => (
                            <option key={header.slug} value={header.slug}>{header.display}</option>
                        ))}
                    </select>

                
                    <input className={"flex-none appearance-none block bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"} name="searchTerm" type="text" placeholder="Spain"/>
                    <button type="submit" className="flex-none rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        Go
                    </button>
                    <Link to="/listExplorer">Clear</Link>
                </div>
            </form> */}
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
