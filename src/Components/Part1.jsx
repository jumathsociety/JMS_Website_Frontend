import React from "react";

function Part1() {
  return (
    <div className="w-full">
      <div className="relative">
        <img
          src="../../Images/MatheMatics_image.jpg"
          alt=""
          className="object-fill w-full opacity-20"
          style={{ height: "calc(100vh - 10vh)" }}
        />
        <div className="absolute top-[30%] left-[2%]">
          <div className="text-green-500 font-mono" style={{fontSize: "5rem"}}>
            Jadavpur University Maths Soceity
          </div>
          <div className="text-blue-700 font-mono ml-[30%] mt-12 text-6xl">
            Welcomes You
          </div>
        </div>
      </div>
    </div>
  );
}

export default Part1;
