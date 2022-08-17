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

export default function ListExplorer() {
    const { events } = useLoaderData() as LoaderData;

  return (
    <div style={{height: '100%', width: '100%'}}>
        <h3>Bucket List items!</h3>
        <ul>
            {events.map((event) => (
                <li key={event.id}>
                    {`${event.name} in ${event.country}`}
                </li>
            ))}
        </ul>
        <Link to="new">Add to your bucket list</Link>
        <Outlet/>
    </div>
  );
}
