import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { db } from "./config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import ContactCard from "./components/ContactCard";
import AddAndUpdate from "./components/AddAndUpdate";
import useDisclouse from "./hooks/useDisclouse";
import { IoMdToday } from "react-icons/io";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const {isOpen, onClose, onOpen} = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) =>{

          const contactsLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactsLists);
          return contactsLists;
        })
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {

      const contactsLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const fiteredContacts = contactsLists.filter((contact) =>
      contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(fiteredContacts);
      return contactsLists;
    });

  };

  return (
    <>
    <div className="mx-auto max-w-[370] px-4">
      <Navbar />
      <div className="flex gap-2">
        <div className="relative flex flex-grow items-center">
          <FiSearch className="absolute ml-1 text-3xl text-white" />
          <input
          onChange={filterContacts}
            type="text"
            className="h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
          />
        </div>
        <AiFillPlusCircle onClick={onOpen} className="cursor-pointer text-5xl text-white " />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {contacts.length <= 0 ? (
          <NotFoundContact />
        ) : (contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        )))}
      </div>
    </div>
   <AddAndUpdate onClose={onClose} isOpen={isOpen}/>
   <ToastContainer position="bottom-center" />
   </>
  );
};

export default App;
