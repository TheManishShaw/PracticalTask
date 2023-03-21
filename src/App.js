import "./App.css";
import { Route, Routes } from "react-router-dom";

import ContactList from "./components/ContactList";
import AddContactForm from "./components/AddContactForm";
import EditContactForm from "./components/EditContactForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<ContactList />} />
        <Route exact path="/add" element={<AddContactForm />} />
        <Route exact path="/edit/:id" element={<EditContactForm />} />
      </Routes>
    </div>
  );
}

export default App;
