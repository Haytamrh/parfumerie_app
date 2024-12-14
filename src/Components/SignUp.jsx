import React, { useState } from 'react';
import AuthService from './Authservice';

const SignUp = () => {
  const [formData, setFormData] = useState({
    nom_client: '',
    mot_de_passe: '',
    adresse_email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.register(formData.nom_client, formData.mot_de_passe, formData.adresse_email).then(
      response => {
        console.log(response.data);
      },
      error => {
        console.error(error);
      }
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Inscription</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nom:</label>
          <input
            type="text"
            name="nom_client"
            placeholder="Entrez votre nom"
            value={formData.nom_client}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Mot de passe:</label>
          <input
            type="password"
            name="mot_de_passe"
            placeholder="Entrez votre mot de passe"
            value={formData.mot_de_passe}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="adresse_email"
            placeholder="Entrez votre email"
            value={formData.adresse_email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default SignUp;
