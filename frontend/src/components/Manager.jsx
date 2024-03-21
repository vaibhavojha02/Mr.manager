import React, { useRef, useState, useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Manager = () => {
  const ref = useRef(null);
  const passwordRef = useRef(null);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");

    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("/hide.png")) {
      ref.current.src = "public/view.png";
      passwordRef.current.type = "password";

      // ref.current.
    } else {
      ref.current.src = "public/hide.png";

      passwordRef.current.type = "text";
    }
  };
  const addPassword = () => {
    console.log(form);
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));

    toast.success("Password has been successfully added", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id != id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id != id))
      );

      toast.success("Successfully deleted", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  const editPassword = (id) => {
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id != id))
    );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const copyText = (text) => {
    toast.success("copied to clipboard", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={4}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      <div className=" max-w-[1280px] flex justify-center mx-auto mt-[100px] text-black ">
        <input
          value={form.site}
          type="text"
          placeholder="Enter your website url"
          className="input input-primary input-bordered w-full mx-auto  bg-white"
          onChange={handleChange}
          name="site"
        />
      </div>

      <div className="mt-6 max-w-[1280px] md:flex justify-center mx-auto gap-2 text-black ">
        <input
          value={form.username}
          type="text"
          placeholder="Username"
          className="input input-primary  input-bordered md:w-[960px] w-full  bg-white"
          onChange={handleChange}
          name="username"
        />
        <div className="flex grow relative text-black">
          <input
            ref={passwordRef}
            value={form.password}
            type="password"
            placeholder="Password"
            className="input input-primary grow bg-white relative sm:mt-6 md:mt-0  w-full"
            onChange={handleChange}
            name="password"
          ></input>
          <div className="absolute flex right-2 top-3 text-xl cursor-pointer">
            <img
              src="./view.png "
              ref={ref}
              onClick={showPassword}
              className="h-[17px] w-[17px] stroke-white"
            ></img>
          </div>
        </div>
      </div>

      <div className="flex justify-center item-center mt-[60px]">
        <button
          className="hover:bg-green-500 text-white text-2xl  flex pl-[50px] pr-[50px] pt-4 pb-4 border input-primary rounded-2xl "
          onClick={addPassword}
        >
          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className="text-center">Add</span>
          </div>
        </button>
      </div>

      <div className="passwords max-w-[1280px] mx-auto mb-6">
        <h2 className="text-center mt-[50px] text-3xl p-2">Passwords</h2>
        {passwordArray.length === 0 && (
          <div className="text-2xl">No passwords to show</div>
        )}
        {passwordArray.length != 0 && (
          <div className=" max-w-[1280px] overflow-hidden rounded-3xl   mx-auto mt-4 backdrop-blur-3xl">
            <table className="table">
              {/* head */}
              <thead className="text-xl ">
                <tr>
                  <th>Site</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-white font-medium">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index} className="hover">
                      <td className="flex gap-2">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="w-4 h-4 cursor-pointer"
                          onClick={() => copyText(item.site)}
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M3 6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3Zm1.75 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5ZM4 11.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </td>
                      <td>
                        <div className="flex gap-2 sm:mt-6">
                          <span>{item.username}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 cursor-pointer text-center"
                            onClick={() => copyText(item.username)}
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z"
                              clipRule="evenodd"
                            />
                            <path
                              fillRule="evenodd"
                              d="M3 6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3Zm1.75 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5ZM4 11.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </td>

                      <td>
                        <div className="flex gap-2">
                          <span>{item.password}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 cursor-pointer text-center "
                            onClick={() => copyText(item.password)}
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z"
                              clipRule="evenodd"
                            />
                            <path
                              fillRule="evenodd"
                              d="M3 6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3Zm1.75 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5ZM4 11.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-2 justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                          <span className="text-2xl">/</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;
