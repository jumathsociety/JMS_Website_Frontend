import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";

function Index(props) {
  const [Name, setName] = useState("");

  useEffect(() => {
    const getProfileInfo = async () => {
      let value = document.cookie;
      let val = value.split(";");
      for (let i = 0; i < val.length; i++) {
        if (val[i].startsWith("ProfileInfo=")) {
          let profile = val[i].substring(12);
          profile = decodeURIComponent(profile);
          profile = profile.substring(2);
          profile = JSON.parse(profile);
          return profile;
        } else if (val[i].startsWith(" ProfileInfo=")) {
          let profile = val[i].substring(13);
          profile = decodeURIComponent(profile);
          profile = profile.substring(2);
          profile = JSON.parse(profile);
          return profile;
        }
      }
    };
    const names = async () => {
      const profiles = await getProfileInfo();
      setName(profiles.name);
      props.setdetails({
        name: profiles.name,
        email: profiles.email,
        college: profiles.college,
        department: profiles.department,
        year: profiles.year,
        password: profiles.password,
      });
    };
    names();
  }, []);

  const handleLogout = async () => {
    document.cookie = `Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    document.cookie = `ProfileInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    window.location.reload();
  };

  return (
    <div className="text-white h-16 bg-gray-800 grid grid-cols-3 shadow-lg px-6">
      <div className="flex items-center cursor-pointer">
        <img
          src="https://lh3.googleusercontent.com/pw/AP1GczNOHKK_fmL0VuRE5IEVU-patZOTHIbdCTTIXaHwdpdhyxXNCWBLxP46oAPBbm8BmH7Cqun-1-jIH7p5n4DAdTjtsSCNSGzsWFfd0h9HGWu1AsPosaVxaXZzp6t922e8jYanAoJqJC3leH0T1_gaelJn=w640-h640-s-no-gm?authuser=0"
          alt="No image"
          height={50}
          width={50}
          className="rounded-lg mr-4"
        />
        <div className="font-semibold text-lg hover:text-blue-400 transition-colors">
          <a href="/">Jadavpur University Mathematics Society</a>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        {["Home", "About", "Library", "Rules", "Admins", "Talks", "Meet"].map(
          (link, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:text-blue-400 transition-colors ${
                window.location.pathname ===
                `/${link.toLowerCase().replace(/\s/g, "")}`
                  ? "text-blue-800"
                  : "text-white"
              }`}
            >
              <a href={`/${link.toLowerCase().replace(/\s/g, "")}`}>{link}</a>
            </div>
          )
        )}
        <div className={`cursor-pointer ${props.auth ? "" : "hidden"}`}>
          <a href="/profiles">
            <Avatar
              sx={{
                bgcolor:
                  window.location.pathname === "/profiles" ? "blue" : "white",
                color:
                  window.location.pathname === "/profiles" ? "white" : "blue",
              }}
            >
              {Name[0]}
            </Avatar>
          </a>
        </div>
      </div>

      <div className="flex items-center gap-10 justify-end">
        <div
          className={`cursor-pointer hover:text-blue-400 transition-colors ${
            window.location.pathname === "/login"
              ? "text-blue-800"
              : "text-white"
          }`}
        >
          <a href="/login">Login</a>
        </div>
        <div
          className="cursor-pointer hover:text-red-400 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </div>
  );
}

export default Index;
