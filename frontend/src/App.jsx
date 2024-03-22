import { useState } from "react";

import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";
function App() {
  return (
    <>
       <div className=" fixed inset-0 -z-10 h-screen  w-screen items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="min-h-[90vh]">
        <Manager />
      </div>

      <Footer />
    </>
  );
}

export default App;
