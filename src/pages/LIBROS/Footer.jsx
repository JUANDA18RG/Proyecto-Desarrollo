import React from "react";


const Footer = () => {
  return (
    <div className=" mx-auto m-auto h-[300px]  mt-16 sm:h-[150px]">
      <div className=" bg-blue-500 h-full flex flex-col gap-8 items-center justify-between p-10 sm:p-7">
        <h2 
        data-aos="zoom-out"
         className=" font-bold text-5xl sm:text-3xl text-white">BookFinder</h2>
        <div className="sm:text-[12px] text-white">
          | Copyright &copy; <span>2023 BookFinder</span>
          <a href="#"></a> |
        </div>
      </div>
    </div>
  );
};
export default Footer;
