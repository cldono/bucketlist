import { Form, useLoaderData } from "@remix-run/react";

export const inputClass = `block tracking-wide text-gray-700 text-s mb-1`;
export function months() {
    return [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
}

export function formatLocation(state: string | null, country: string | null) {
    if (state && country) {
        return `${state}, ${country}`
    } 
    return `${state || ""}${country || ""}`
}

export function formatDate(month: number | null, year: number | null) {
    if (!month || !year) {
        return "";
    }

    return `${months()[month-1]} ${year}`
}

export const COLUMN_HEADERS = [
    {
        slug: "name", 
        display: "Event"
    },
    {
        slug: "state",
        display: "State/Province"
    },
    {
        slug: "country",
        display: "Country"
    },
    {
        slug: "dateMonth",
        display: "Month"
    },
    {
        slug: "dateYear",
        display: "Year"
    },
    {
        slug: "category",
        display: "Category"
    },
    {
        slug: "completed",
        display: "Completed?"
    }
]

export function renderCompletedForm(id: number, completed: boolean) {
    return <Form method="post">
        <input type="hidden" name="id" value={id}/>
        <input type="hidden" name="completed" value={(!completed).toString()}></input>
        <button type="submit" name="_action" value="toggleCompleted">
        <text className={inputClass}>{completed ? "✅" : "❌"}</text>
        </button>
    </Form>
}