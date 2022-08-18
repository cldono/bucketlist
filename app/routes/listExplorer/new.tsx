import {
  redirect,
  type ActionFunction,
  type ActionData,
  json,
} from "@remix-run/node";
import { createEvent } from "~/models/listExplorer.server";
import invariant from "tiny-invariant";
import Modal from "~/components/Modal";
import NewItemForm from "~/components/NewItemForm";
import { useActionData } from "@remix-run/react";

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

  const errors: ActionData = {
    name: name ? null : "Event name is required",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json<ActionData>(errors);
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
  const errors = useActionData();

  return (
    <Modal
      title="Add to your bucket list"
      isOpen={true}
      modalContent={<NewItemForm nameError={errors?.name} />}
    />
  );
}
