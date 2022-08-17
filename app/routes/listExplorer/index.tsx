import { Link, useLoaderData } from "@remix-run/react";
import * as React from "react";
import { json } from "@remix-run/node";
import NewItemModal from "~/components/NewEventModal";
import { getAllEvents } from "~/models/listExporer.server";

type LoaderData = {
    events: Awaited<ReturnType<typeof getAllEvents>>;
};

export const loader = async () => {
return json<LoaderData>({
    events: await getAllEvents(),
});
};

export default function Index() {
    const { events } = useLoaderData() as LoaderData;
    console.log("HERE IS EVENT DATA: ", events)

    const [isOpen, setIsOpen] = React.useState(false)
    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }

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
        <button onClick={() => setIsOpen(true)}><h1>+</h1></button>
        <NewItemModal isOpen={isOpen} setIsOpen={(isOpen) => {setIsOpen(isOpen)}}/>
  
    </div>
  );
}
