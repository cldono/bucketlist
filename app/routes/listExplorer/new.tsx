import { redirect, type ActionFunction } from "@remix-run/node";
import { createEvent } from "~/models/listExplorer.server";

import Modal from "~/components/Modal";
import NewItemForm from "~/components/NewItemForm";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  let values = Object.fromEntries(formData.entries());

  const name = values.name.toString();
  const state = values.state.toString();
  const country = values.country.toString();
  const notes = values.notes.toString();
  const category = values.category.toString();

  const dateStr = formData.get("date");
  let dateMonth = null;
  let dateYear = null;

  if (dateStr) {
    const splitStr = dateStr.toString().split("-");
    dateYear = parseInt(splitStr[0]);
    dateMonth = parseInt(splitStr[1]);
  }

  await createEvent({
    name,
    category,
    state,
    country,
    dateMonth,
    dateYear,
    notes,
  });

  return redirect("/listExplorer");
};

export default function ListExploreNew() {
  return (
    <Modal
      title="Add to your bucket list"
      isOpen={true}
      modalContent={<NewItemForm />}
    />
  );
}
