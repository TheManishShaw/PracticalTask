import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FloatingButton from "./FloatingButton";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Get contacts from local storage and set state
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(storedContacts);
    setFilteredContacts(storedContacts);
  }, []);

  useEffect(() => {
    // Filter contacts based on search term
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.cellNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [contacts, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemove = (id) => {
    // Remove contact from state and local storage
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    setFilteredContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  return (
    <div>
      <FloatingButton />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-800">
          <div>
            <h1 className="font-bold text-2xl text-white">Contact List</h1>
          </div>
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              value={searchTerm}
              onChange={handleSearch}
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        {filteredContacts.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Cell No
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://flowbite.com/docs/images/logo.svg"
                      alt="Jese "
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {contact.name}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{contact.cellNo}</td>
                  <td className="px-6 py-4">{contact.email}</td>
                  <td className="px-6 py-4 flex  gap-2">
                    <Link
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      to={`/edit/${contact.id}`}
                    >
                      Edit
                    </Link>{" "}
                    |{" "}
                    <p
                      className="font-medium text-blue-600 dark:text-blue-500 cursor-pointer hover:underline"
                      onClick={() => handleRemove(contact.id)}
                    >
                      Remove
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No contacts found.</p>
        )}
      </div>

      {/* <Link to="/add">Add New Contact</Link> */}
    </div>
  );
}

export default ContactList;
