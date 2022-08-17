import { redirect, type ActionFunction } from "@remix-run/node";
import { createEvent } from "~/models/listExplorer.server";
import { Form} from "@remix-run/react";
import { Link } from "@remix-run/react";


import Modal from "~/components/Modal";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    
    const name = formData.get("name");
    const state = formData.get("state");
    const country = formData.get("country");
    const notes = formData.get("notes");

    const dateStr = formData.get("date");
    let dateMonth = null;
    let dateYear = null;

    if (dateStr) {
        const splitStr = dateStr.split("-")
        dateYear = parseInt(splitStr[0])
        dateMonth = parseInt(splitStr[1])
    }
    
    await createEvent({ name, state, country, dateMonth, dateYear, notes});
  
    return redirect("/listExplorer");
};

export default function ListExploreNew() {
    const labelClass = `block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1`;
    const inputClass = `appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`
    
    const form = <Form method="post">
    <div>
        <label className={labelClass}>
        Event
        </label>
        <input className={inputClass} name="name" type="text" placeholder="Skydive"/>
    </div>
    <div className="flex gap-1">
        <div className="flex flex-col">
        <label className={labelClass}>
            State/Province
        </label>
        <input className={inputClass} name="state" type="text" placeholder="New York"/>
        </div>
        <div className="flex flex-col">
        <label className={labelClass}>
            Country
        </label>
        <input className={inputClass} name="country" type="text" placeholder="United States"/>
        </div>
    </div>
    <div>
        <label className={labelClass}>
        Date
        </label>
        <input className={inputClass} name="date" type="month"></input>
    </div>
    <div>
        <label className={labelClass}>
            Details
        </label>
        <textarea className={inputClass} name="notes" placeholder="And here's how I'll do it" rows={3}></textarea>
    </div>
    <div className="text-right flex justify-between">
        <Link
            to="/listExplorer"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
            Cancel
        </Link>
        <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
        Save
        </button>

    </div>
</Form> 
    return(<Modal title="Add to your bucket list" isOpen={true} modalContent={form}/>)
}