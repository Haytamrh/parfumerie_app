import React from 'react';

const Navlinks = () => {
  return (
    <nav className="bg-gray-700  ">
      <ul className="space-y-2 text-center p-2">
        <li>
          <a 
            href="#parfum-homme" 
            className="text-white hover:text-gray-400 m-6 "
          >
            Parfum Homme
          </a>
        
          <a 
            href="#parfum-femme" 
            className="text-white hover:text-gray-400 m-6 "
          >
            Parfum Femme
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navlinks;
