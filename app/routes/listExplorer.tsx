import { Link, useLoaderData, Outlet } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getAllEvents, updateEventCompleted } from "~/models/listExplorer.server";
import { months, COLUMN_HEADERS, renderCompletedForm } from "../utils/helpers"

type LoaderData = {
    events: Awaited<ReturnType<typeof getAllEvents>>;
};

function translateSearchTerm(column: string | null, searchTerm: string | null) {
    if(column === "dateMonth") {
        months().indexOf(searchTerm) + 1
    } else if(column === "dateYear") {
        parseInt(searchTerm)
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
    events: await getAllEvents(sortBy || "id", column, translateSearchTerm(column, searchTerm)),
});
};

export const action: ActionFunction = async ({
    request,
  }) => {
    const formData = await request.formData();
    let {_action, ...values} = Object.fromEntries(formData.entries())
    
    if (_action === "toggleCompleted") {
      const id = parseInt(values.id)
      updateEventCompleted(id, values.completed === "true")
      return redirect(`/listExplorer`);
    }  
  };

const inputClass = `appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`

const cellClass = "py-3 px-6"

export default function ListExplorer() {
    const { events } = useLoaderData() as LoaderData;

    const table = 
        <div className="w-full">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    {COLUMN_HEADERS.map((header) => (
                        <th key={header.slug}className={cellClass}>
                        <div className="flex items-center gap-1">
                            {header.display}
                            <Link to={`?sortBy=${header.slug}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-down" viewBox="0 0 16 16">
                                    <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                                </svg>
                            </Link>
                        </div>
                    </th>
                    ))}
                </thead>
                { events.map((event) => 
                    <tr key={event.id.toString()} className="m-10">
                        <td className={cellClass}><Link to={`${event.id}`}>{event.name}</Link></td>
                        <td className={cellClass}>{event.state}</td>
                        <td className={cellClass}>{event.country}</td>
                        <td className={cellClass}>{event.dateMonth ? months()[event.dateMonth - 1 ]: ""}</td>
                        <td className={cellClass}>{event.dateYear}</td>
                        <td className={cellClass}>{event.category}</td>
                        <td className={cellClass}>{renderCompletedForm(event.id, event.completed)}</td>
                    </tr>
                )}
            </table>
        </div>

  return (
    <div style={{height: '100%', width: '100%'}}>
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
        <div className="flex gap-5">
            {table}
            <Outlet/>
        </div>
        <Link to="new">Add to your bucket list</Link>
    </div>
  );
}
