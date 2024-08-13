import React, { useState } from 'react';
import { BACKEND_URL } from "../config";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();
    const response = await fetch(`${BACKEND_URL}/api/user/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    if(response.status == 200){
      const data = await response.json();
      document.cookie = `Token=${data.token}; path=/; domain=${window.location.hostname}; secure=true; sameSite=none;`
      document.cookie = `ProfileInfo=${encodeURIComponent(`j:` + JSON.stringify(data.profileinfo))};  path=/; domain=${window.location.hostname}; secure=true; sameSite=none;`
      window.location.href = '/';
    }
    else{
      const data = await response.json();
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 pt-16" style={{height: "calc(100 vh - 90 vh)"}}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Mathematics Society Club Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="text-center">
          <a href="/register" className="text-sm text-blue-500 hover:underline">
            Not signed up? Register
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
