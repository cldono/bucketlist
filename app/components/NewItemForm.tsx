import { Form } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { buttonStyle, categoryOptions } from "~/utils/helpers";

export default function NewItemForm() {
  const labelClass = `block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1`;
  const inputClass = `appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`;

  return (
    <Form method="post">
      <div>
        <label className={labelClass}>Event</label>
        <input
          className={inputClass}
          name="name"
          type="text"
          placeholder="Skydive"
        />
      </div>
      <div className="flex gap-1">
        <div className="flex flex-col">
          <label className={labelClass}>State/Province</label>
          <input
            className={inputClass}
            name="state"
            type="text"
            placeholder="New York"
          />
        </div>
        <div className="flex flex-col">
          <label className={labelClass}>Country</label>
          <input
            className={inputClass}
            name="country"
            type="text"
            placeholder="United States"
          />
        </div>
      </div>
      <div className="flex gap-1">
        <div className="flex flex-col">
          <label className={labelClass}>Date</label>
          <input className={inputClass} name="date" type="month"></input>
        </div>
        <div className="flex flex-col">
          <label className={labelClass}>Category</label>
          <select name="category">
            {categoryOptions.map((category) => (
              <option className={inputClass} key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass}>Details</label>
        <textarea
          className={inputClass}
          name="notes"
          placeholder="And here's how I'll do it"
          rows={3}
        ></textarea>
      </div>
      <div className="flex justify-between text-right">
        <Link to="/listExplorer" className={buttonStyle}>
          Cancel
        </Link>
        <button type="submit" className={buttonStyle}>
          Save
        </button>
      </div>
    </Form>
  );
}
