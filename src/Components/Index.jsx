import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';

function Index(props) {
  const [Name, setName] = useState('');
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
    const names = async()=>{
      const profiles = await getProfileInfo();
      setName(profiles.name);
      props.setdetails({
        name: profiles.name,
        email: profiles.email,
        college: profiles.college, 
        department: profiles.department,
        year: profiles.year,
        password: profiles.password
      })
    }
    names();
  }, []);

  const handlelogout = async () => {
    document.cookie = `Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    document.cookie = `ProfileInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    window.location.reload();
  };
  return (
    <div className="text-white h-14 bg-gray-500 grid grid-cols-3">
      <div className="flex items-center ml-12 cursor-pointer">
        <img
          src="https://lh3.googleusercontent.com/pw/AP1GczNOHKK_fmL0VuRE5IEVU-patZOTHIbdCTTIXaHwdpdhyxXNCWBLxP46oAPBbm8BmH7Cqun-1-jIH7p5n4DAdTjtsSCNSGzsWFfd0h9HGWu1AsPosaVxaXZzp6t922e8jYanAoJqJC3leH0T1_gaelJn=w640-h640-s-no-gm?authuser=0"
          alt="No image"
          height={50}
          width={50}
          className="rounded-lg mr-4"
        />
        <div className="">Jadavpur University Mathematics Soceity</div>
      </div>
      <div className="flex items-center justify-center gap-10">
        <div className=" cursor-pointer">Home</div>
        <div className=" cursor-pointer">About Us</div>
        <div className=" cursor-pointer">Library</div>
        <div className=" cursor-pointer">Rules</div>
        <div className=" cursor-pointer">Admins</div>
        <div
          className={` cursor-pointer ${
            props.auth === true ? "none" : "hidden"
          }`}
        >
          <a href="/profiles"><Avatar sx={{ bgcolor: 'primary.main' }}>{Name[0]}</Avatar></a>
        </div>
      </div>
      <div className="flex items-center gap-14 justify-center">
        <div className="cursor-pointer">
          <a href="/login">Login</a>
        </div>
        <div className=" cursor-pointer" onClick={handlelogout}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default Index;
