import { Link, useLoaderData, Outlet } from "@remix-run/react";
import * as React from "react";
import { json } from "@remix-run/node";
import { getAllEvents } from "~/models/listExplorer.server";

type LoaderData = {
    events: Awaited<ReturnType<typeof getAllEvents>>;
};

export const loader = async () => {
return json<LoaderData>({
    events: await getAllEvents(),
});
};

const MONTHS = [ "January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December" ];

export default function ListExplorer() {
    const { events } = useLoaderData() as LoaderData;

    const cellClass = "py-3 px-6"
    const table = 
    <div className="w-full">
         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <th className={cellClass}>Event</th>
                <th className={cellClass}>State/Provience</th>
                <th className={cellClass}>Country</th>
                <th className={cellClass}>Month</th>
                <th className={cellClass}>Year</th>
                
            </thead>
            {/* formatLocation(event.state, event.country) */}
            {/* formatDate(event.dateMonth, event.dateYear) */}
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
            {/* <div className="flex-1">
                
            </div> */}
        </div>

        <Link to="new">Add to your bucket list</Link>
        
    </div>
  );
}
