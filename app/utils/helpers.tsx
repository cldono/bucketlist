import { Form, useLoaderData } from "@remix-run/react";

export const buttonStyle =
  "inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

export function months() {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
}

export const categoryOptions = [
  "Music",
  "Sightseeing",
  "Food/Drink",
  "Nature",
  "Skills/Hobbies",
];

export function formatLocation(state: string | null, country: string | null) {
  if (state && country) {
    return `${state}, ${country}`;
  }
  return `${state || ""}${country || ""}`;
}

export function formatDate(month: number | null, year: number | null) {
  if (!month || !year) {
    return "";
  }

  return `${months()[month - 1]} ${year}`;
}

export const COLUMN_HEADERS = [
  {
    slug: "name",
    display: "Event",
  },
  {
    slug: "state",
    display: "State/Province",
  },
  {
    slug: "country",
    display: "Country",
  },
  {
    slug: "dateMonth",
    display: "Month",
  },
  {
    slug: "dateYear",
    display: "Year",
  },
  {
    slug: "category",
    display: "Category",
  },
  {
    slug: "completed",
    display: "Completed?",
  },
];

// NOTE in order to take advantage of this component, need to create an ActionHandle in route module where used
export function renderCompletedForm(id: number, completed: boolean) {
  return (
    <Form method="post">
      <input type="hidden" name="id" value={id} />
      <input
        type="hidden"
        name="completed"
        value={(!completed).toString()}
      ></input>
      <button type="submit" name="_action" value="toggleCompleted">
        <text className={`text-s mb-1 block tracking-wide text-gray-700`}>
          {completed ? "✅" : "❌"}
        </text>
      </button>
    </Form>
  );
}
