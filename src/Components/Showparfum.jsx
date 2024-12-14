import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PanierContext } from './PanierContext';

const Showparfum = () => {
  const { id } = useParams();
  const [parfum, setParfum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ajouterAuPanier } = useContext(PanierContext);

  useEffect(() => {
    const fetchParfum = async () => {
      try {
        const response = await fetch(`http://localhost:3001/parfums/${id}`);
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();
        setParfum(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchParfum();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      {parfum && (
        <>
          <h1 className="text-3xl font-bold mb-4">{parfum.nom}</h1>
          <p className="text-gray-700"><span className="font-bold">Marque:</span> {parfum.marque}</p>
          <p className="text-gray-700"><span className="font-bold">Type:</span> {parfum.type}</p>
          <p className="text-gray-700"><span className="font-bold">Genre:</span> {parfum.genre}</p>
          <p className="text-gray-700"><span className="font-bold">Prix:</span> {parfum.prix} MAD</p>
          <p className="text-gray-700"><span className="font-bold">Quantité:</span> {parfum.quantite} ml</p>
          <p className="text-gray-700"><span className="font-bold">Description:</span> {parfum.description}</p>
          {parfum.image && (
            <img
              src={`http://localhost:3001${parfum.image}`}
              alt={parfum.nom}
              className="w-64 h-64 object-cover mt-4 rounded-lg shadow-sm"
            />
          )}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg mt-4"
            onClick={() => ajouterAuPanier(parfum)}
          >
            Ajouter au panier
          </button>
        </>
      )}
    </div>
  );
};

export default Showparfum;
