import React, { useState } from 'react';
import { FaReact } from 'react-icons/fa'; 
import { FiHome, FiLogIn, FiShoppingCart } from 'react-icons/fi'; 
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Ajoutez la logique de recherche ici
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center ">
      <div className="flex items-center">
      < Link to ="/" className="text-white text-2xl font-bold">FraganceX</Link>
      </div>

      <form className="flex" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="p-2 rounded-l-md border-none focus:outline-none"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="bg-yellow-700 text-white p-2 rounded-r-md hover:bg-#b45309"
        >
          Rechercher
        </button>
      </form>

      <div className="flex space-x-4 cursor-pointer">
        <a  
          className="text-white hover:text-gray-400 flex items-center"
        >
          <FiHome className="mr-1  " />
          Accueil
        </a>
        <Link to="/signin">
        <a
          className="text-white hover:text-gray-400 flex items-center"
          
        >
          <FiLogIn className="mr-1" />
          S'authentifier
        </a>
        </Link>
        <Link to="/panier">
        <a
          className="text-white hover:text-gray-400 flex items-center"
        >
          <FiShoppingCart className="mr-1" />
          Panier
        </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
