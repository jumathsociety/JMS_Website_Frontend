import React, { useEffect, useState } from "react";

function Otpverify() {
  const [otp, setOtp] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const output = async () => {
      const storedData = localStorage.getItem("registrationData");
      if (storedData) {
        const val = await JSON.parse(storedData);
        setData(val);
        console.log(val);
      } else {
        console.log("Absent");
      }
    };
    output();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/users/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otp,
          data: data,
        }),
      });

      if (!(response.status == 200)) {
        throw new Error("Network response was not ok");
      }
      localStorage.clear();
      window.location.href = "/login";
    } catch (error) {
      localStorage.clear();
      alert("Incorrect OTP Provided.");
      console.log("Incorrect")
      window.location.href = "/register"
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">OTP Verification</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-gray-700 font-semibold mb-2">Enter OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Otpverify;
