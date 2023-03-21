import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddContactForm() {
  const [name, setName] = useState("");
  const [cellNo, setCellNo] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form inputs
    if (!name.trim() || !cellNo.trim() || !email.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    // Get contacts from lo   cal storage
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Generate unique id for new contact
    const id = storedContacts.length
      ? storedContacts[storedContacts.length - 1].id + 1
      : 1;

    // Create new contact object and add to local storage
    const newContact = { id, name, cellNo, email, notes };
    storedContacts.push(newContact);
    localStorage.setItem("contacts", JSON.stringify(storedContacts));

    // Clear form inputs and navigate back to contact list
    setName("");
    setCellNo("");
    setEmail("");
    setNotes("");
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1>Add New Contact</h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Name"
          />
        </div>
        <div className="mb-2">
          <input
            type="tel"
            id="cellNo"
            value={cellNo}
            onChange={(e) => setCellNo(e.target.value)}
            placeholder="Cell no"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            rows="4"
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Write your notes here..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Add Contact
        </button>
      </form>
    </div>
  );
}

export default AddContactForm;
