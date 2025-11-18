import React from "react";
import { FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#071a2c] text-white py-6">
      
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white text-sm">
            D
          </div>
          <span className="font-semibold tracking-wider">HERO.IO</span>
        </div>

        {/* -------------------Social Links------------------- */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-300">Social Links</span>
          <FaGithub className="cursor-pointer hover:text-blue-400" />
          <FaTwitter className="cursor-pointer hover:text-blue-400" />
          <FaFacebookF className="cursor-pointer hover:text-blue-400" />
        </div>
      </div>


      <div className="border-t border-slate-700 mt-4"></div>

      {/*----------- Bottom -------- */}
      <p className="text-center text-xs text-slate-400 mt-2">
        Copyright © 2025 - All right reserved
      </p>
    </footer>
  );
};

export default Footer;
