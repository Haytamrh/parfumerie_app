// src/ParfumList.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { PanierContext } from './PanierContext';


const ParfumList = () => {
    const [parfums, setParfums] = useState([]);
    const [error, setError] = useState(null);
    const { ajouterAuPanier } = useContext(PanierContext);

    useEffect(() => {
        axios.get('http://localhost:3001/parfums')
            .then(response => {
                setParfums(response.data);
            })
            .catch(error => {
                console.error('Error fetching perfumes:', error);
                setError('Une erreur est survenue lors du chargement des parfums.');
            });
    }, []);

    return (
        <div>
            <div className="p-4 bg-gray-100 min-h-screen">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 flex flex-col items-center">Liste des parfums</h2>
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {parfums.map(parfum => (
                        <div key={parfum._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:scale-105">
                            <h3 className="text-xl font-semibold mb-2 text-gray-700">{parfum.nom}</h3>
                            <p className="text-gray-600"><span className="font-bold">Marque:</span> {parfum.marque}</p>
                            <p className="text-gray-600"><span className="font-bold">Quantité:</span> {parfum.quantite} ml</p>
                            <p className="text-gray-600"><span className="font-bold">Prix:</span> {parfum.prix} MAD</p>
                            {parfum.image && (
                                <img
                                    src={`http://localhost:3001${parfum.image}`}
                                    alt={parfum.nom}
                                    className="w-32 h-32 object-cover mt-4 rounded-lg shadow-sm"
                                />
                            )}
                            <Link
                                to={`/parfums/${parfum._id}`}
                                className="text-blue-500 hover:underline mt-2"
                            >
                                Voir détails
                            </Link>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg mt-4"
                                onClick={() => ajouterAuPanier(parfum)}
                            >
                                Ajouter au panier
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ParfumList;
