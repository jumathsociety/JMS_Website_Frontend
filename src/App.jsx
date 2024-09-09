import "./App.css";
import { useState, useEffect } from "react";
import Footer from "./Components/Footer";
import Index from "./Components/Index";
import Login from "./Components/Login";
import Official from "./Components/Official";
import Part1 from "./Components/Part1";
import Part2 from "./Components/Part2";
import Register from "./Components/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./Components/Profile";
import QueryBox from "./Components/QueryBox";
import Otpverify from "./Components/VerifyOTP";
import Talk from "./Components/Talk";
import Meet from "./Components/Meet";

function App() {
  const [details, setdetails] = useState({})
  const [authenticated, setauthenticated] = useState(false);
  useEffect(() => {
    function getToken() {
      let value = document.cookie;
      if (value == "") {
        return null;
      }
      let val = value.split(";");
      for (let i = 0; i < val.length; i++) {
        let tokenCookie = val[i];
        if (tokenCookie.startsWith(` Token=`)) {
          let token = tokenCookie.substring(7);
          return token;
        } else if (tokenCookie.startsWith(`Token=`)) {
          let token = tokenCookie.substring(6);
          return token;
        }
      }
      return null;
    }
    const check = async () => {
      const token = getToken();
      if (token != null) {
        const response = await fetch("https://nvdqwpdb-8000.inc1.devtunnels.ms/checktoken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token
          })
        });
        if(response.status == 200){
          setauthenticated(true);
        }
      }
    };
    check();
  }, []);

  const router_val = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Part1 />
          <Part2 />
          <QueryBox/>
          <Footer />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/verifyOTP",
      element: <><Otpverify/></>
    },
    {
      path: "/register",
      element: (
        <>
          <Register />
        </>
      ),
    },
    {
      path: "/official",
      element: (
        <>
          <Official />
        </>
      ),
    },
    {
      path: "/profiles",
      element: <><Profile details = {details}/></>
    },
    {
      path: '/talks',
      element: <><Talk details = {details}/></>
    },
    {
      path: '/meet',
      element: <><Meet details = {details}/></>
    },
  ]);
  return (
    <div className="relative bg-black">
      <div className="sticky top-0 left-0 z-20">
        <Index auth = {authenticated} setdetails = {setdetails}/>
      </div>
      <RouterProvider router={router_val} />
    </div>
  );
}

export default App;
