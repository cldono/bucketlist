import { Link, useLoaderData, Outlet } from "@remix-run/react";
import * as React from "react";
import { json } from "@remix-run/node";
import { getAllEvents } from "~/models/listExplorer.server";
import { useSearchParams } from "@remix-run/react";

type LoaderData = {
    events: Awaited<ReturnType<typeof getAllEvents>>;
};

export const loader = async ({ request }) => {
    const url = new URL(request.url);
    const term = url.searchParams.get("sortBy");
return json<LoaderData>({
    events: await getAllEvents(term || "id", "desc"),
});
};

const MONTHS = [ "January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December" ];

const sortIconPath = "M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
const cellClass = "py-3 px-6"

export default function ListExplorer() {
    const { events } = useLoaderData() as LoaderData;

    const table = 
        <div className="w-full">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <th className={cellClass}>
                        <div className="flex items-center">
                            Event
                            <Link to="?sortBy=name"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d={sortIconPath}/></svg></Link>
                        </div>
                    </th>
                    <th className={cellClass}>
                    <div className="flex items-center">
                            State/Province
                            <Link to="?sortBy=state"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d={sortIconPath}/></svg></Link>
                        </div>
                    </th>
                    <th className={cellClass}>
                    <div className="flex items-center">
                            Country
                            <Link to="?sortBy=country"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d={sortIconPath}/></svg></Link>
                        </div>
                    </th>
                    <th className={cellClass}><div className="flex items-center">
                            Month
                            <Link to="?sortBy=dateMonth"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d={sortIconPath}/></svg></Link>
                        </div>
                    </th>
                    <th className={cellClass}><div className="flex items-center">
                            Year
                            <Link to="?sortBy=dateYear"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d={sortIconPath}/></svg></Link>
                        </div>
                    </th>
                    
                </thead>
                { events.map((event) => 
                    <tr key={event.id.toString()} className="m-10">
                        <td className={cellClass}><Link to={`${event.id}`}>{event.name}</Link></td>
                        <td className={cellClass}>{event.state}</td>
                        <td className={cellClass}>{event.country}</td>
                        <td className={cellClass}>{event.dateMonth ? MONTHS[event.dateMonth - 1 ]: ""}</td>
                        <td className={cellClass}>{event.dateYear}</td>
                    </tr>
                )}
            </table>
        </div>

  return (
    <div style={{height: '100%', width: '100%'}}>
        <h3>Bucket List items!</h3>
        <div className="flex flex-gap-1">
            {table}
            <Outlet/>
        </div>
        <Link to="new">Add to your bucket list</Link>
    </div>
  );
}
