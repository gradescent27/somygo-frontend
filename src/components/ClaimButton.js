// ClaimButton.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const ClaimButton = ({ text = "Start your claim today", onClick }) => {
  return (
    <Link to="/start-claim">
    <button 
      className="flex items-center bg-blue-600 text-acBlack px-4 py-2 rounded-full text-md font-nunitoSans font-regular shadow-md hover:opacity-80 transition"
      // className="flex items-center bg-acblue text-acBlack px-4 py-2 rounded-full text-md font-nunitoSans font-regular shadow-md hover:opacity-80 transition"
      onClick={onClick}
    >
      {text}
      <span className="ml-3 w-8 h-8 flex items-center justify-center bg-acBlack text-white rounded-full">
        <ArrowUpRight size={18} />
      </span>
    </button>
    </Link>
  );
};

export default ClaimButton;

    