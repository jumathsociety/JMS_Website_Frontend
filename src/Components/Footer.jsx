import React, { useEffect, useRef, useState } from "react";
import Anime from "./Anime";

function Footer() {
  return (
    <div className="text-white flex justify-around">
      <div className="grid grid-cols-4 gap-12">
        <div className="">
          <img
            src="https://lh3.googleusercontent.com/pw/AP1GczNOHKK_fmL0VuRE5IEVU-patZOTHIbdCTTIXaHwdpdhyxXNCWBLxP46oAPBbm8BmH7Cqun-1-jIH7p5n4DAdTjtsSCNSGzsWFfd0h9HGWu1AsPosaVxaXZzp6t922e8jYanAoJqJC3leH0T1_gaelJn=w640-h640-s-no-gm?authuser=0"
            alt="No image"
            height={50}
            width={50}
            className="rounded-lg mr-4 ml-[10%]"
          />
          <div className="text-white">
            <Anime/>
          </div>
          <div className="flex gap-6 my-6">
            <div className="text-sm">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                alt="Image"
                height={30}
                width={30}
              />
              Linked In
            </div>
            <div className="text-sm">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Image"
                height={30}
                width={30}
              />
              Facebook
            </div>
            <div className="text-sm">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Image"
                height={30}
                width={30}
              />
              Instagram
            </div>
            <div className="text-sm">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="Image"
                height={30}
                width={30}
              />
              Watsapp
            </div>
          </div>
        </div>
        <div className="">Box 2</div>
        <div className="">Box 3</div>
        <div className="">Box 4</div>
      </div>
    </div>
  );
}

export default Footer;
