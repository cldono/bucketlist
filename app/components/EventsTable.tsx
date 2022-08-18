import type { BucketListEvent } from "~/models/listExplorer.server";
import { Link } from "@remix-run/react";
import { months, COLUMN_HEADERS, renderCompletedForm } from "~/utils/helpers";

type Props = {
  events: Array<BucketListEvent>;
};
export default function EventsTable({ events }: Props) {
  const cellClass = "py-3 px-6";
  return (
    <div className="w-full">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          {COLUMN_HEADERS.map((header) => (
            <th key={header.slug} className={cellClass}>
              <div className="flex items-center gap-1">
                {header.display}
                <Link to={`?sortBy=${header.slug}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-sort-down"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                  </svg>
                </Link>
              </div>
            </th>
          ))}
        </thead>
        {events.map((event) => (
          <tr key={event.id.toString()} className="m-10">
            <td className={cellClass}>
              <Link to={`${event.id}`}>{event.name}</Link>
            </td>
            <td className={cellClass}>{event.state}</td>
            <td className={cellClass}>{event.country}</td>
            <td className={cellClass}>
              {event.dateMonth ? months()[event.dateMonth - 1] : ""}
            </td>
            <td className={cellClass}>{event.dateYear}</td>
            <td className={cellClass}>{event.category}</td>
            <td className={cellClass}>
              {renderCompletedForm(event.id, event.completed)}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
