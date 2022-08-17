import * as React from "react";
import { Form, useActionData, useTransition} from "@remix-run/react";

export default function NewItemForm() {

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-md`;
  return (
    <div>
        <Form method="post">
        <p>
            <label>
            Post Title:{" "}
            {/* {errors?.title ? (
                <em className="text-red-600">{errors.title}</em>
            ) : null} */}
            <input
                type="text"
                name="title"
                className={inputClassName}
            />
            </label>
        </p>
        <p>
            <label>
            Post Slug:{" "}
            {/* {errors?.slug ? (
                <em className="text-red-600">{errors.slug}</em>
            ) : null} */}
            <input
                type="text"
                name="slug"
                className={inputClassName}
            />
            </label>
        </p>
        <p>
        <label htmlFor="markdown">
            Markdown:{" "}
            {/* {errors?.markdown ? (
                <em className="text-red-600">
                {errors.markdown}
                </em>
            ) : null} */}
            </label>
            <br />
            <textarea
            id="markdown"
            rows={20}
            name="markdown"
            className={`${inputClassName} font-mono`}
            />
        </p>
        <p className="text-right">
            <button
                type="submit"
                className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
                // disabled={isCreating}
                >
                Add to bucketlist
            </button>
        </p>
        <p>
            <input type="month" id="start" name="start"/>
        </p> 
        </Form>
    </div>
  );
}
