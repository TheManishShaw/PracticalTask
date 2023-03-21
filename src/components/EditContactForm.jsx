import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditContactForm() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [cellNo, setCellNo] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Get contact data from local storage and set state
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const contact = storedContacts.find(
      (contact) => contact.id === parseInt(id)
    );
    if (contact) {
      setName(contact.name);
      setCellNo(contact.cellNo);
      setEmail(contact.email);
      setNotes(contact.notes);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!name.trim() || !cellNo.trim() || !email.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    // Get contacts from local storage
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Update existing contact object and update local storage
    const updatedContacts = storedContacts.map((contact) => {
      if (contact.id === parseInt(id)) {
        return { ...contact, name, cellNo, email, notes };
      }
      return contact;
    });
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));

    // Navigate back to contact list
    navigate("/");
  };

  return (
    <div>
      <h1>Edit Contact</h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Name"
            required
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
          UPdate Contact
        </button>
      </form>
    </div>
  );
}
export default EditContactForm;
