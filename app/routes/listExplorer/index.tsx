import { Link } from "@remix-run/react";
import * as React from "react";
import NewItemModal from "~/components/NewItemModal";


export default function Index() {
    const [isOpen, setIsOpen] = React.useState(false)
    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }

  return (
    <div style={{height: '100%', width: '100%'}}>
        <h3>To Do: Display list items here</h3>
        <button onClick={() => setIsOpen(true)}><h1>+</h1></button>
        <NewItemModal isOpen={isOpen} setIsOpen={(isOpen) => {setIsOpen(isOpen)}}/>
  
    </div>
  );
}
