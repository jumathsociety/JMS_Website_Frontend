import React, { useState } from "react";

function QueryBox() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/sendquery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message,
        }),
      });
      if (response.status == 200) {
        alert("Thank you for your feedback");
      } else {
        alert("Message Cennot be sent");
      }
    } catch (error) {
      alert("Internal Server Error");
    }
  };

  return (
    <div className="bg-black my-8 mx-20 p-8 rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white border-b-4 border-blue-500 inline-block pb-2">
          Query Box
        </h1>
      </div>
      <form onSubmit={handlesubmit} className="">
        <div className="flex">
          <div className="flex-1 pr-8 space-y-6">
            <div className="flex space-x-4">
              <input
                type="text"
                className="flex-1 p-2 border rounded-md bg-gray-800 text-white"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="flex-1 p-2 border rounded-md bg-gray-800 text-white"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input
              type="text"
              className="w-full p-2 border rounded-md bg-gray-800 text-white"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              className="w-full p-2 border rounded-md bg-gray-800 text-white"
              placeholder="Message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="w-1/3 space-y-6">
            <div className="p-2 border rounded-md bg-gray-800 text-white">
              <p className="font-bold">Address</p>
              <p>123 Clubhouse Ave, Suite 456</p>
            </div>
            <div className="p-2 border rounded-md bg-gray-800 text-white">
              <p className="font-bold">Email ID</p>
              <p>contact@club.com</p>
            </div>
          </div>
        </div>
        <div className="text-left mt-4 ">
          <button
            type="submit"
            className="px-16 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default QueryBox;
