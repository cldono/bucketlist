import * as React from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from "react";
import { Link } from "@remix-run/react";

export default function Index() {
  // const user = useOptionalUser();

  
  return (
    <div className="bg-blue-100 flex flex-col" style={{height: '100%', width: '100%'}}>
      <text className="text-xl">Welcome, let's work on your bucket list!</text>
      <text className="text-large">Homepage here to talk about reasoning for app</text>
      <Link to="/listExplorer">Explore my list</Link>
    </div>
  );
}
