// src/Components/MonPanier.js
import React, { useContext } from 'react';
import { PanierContext } from './PanierContext';

const MonPanier = () => {
    const { panier, supprimerDuPanier } = useContext(PanierContext);
    const calculerTotal = () => {
        return panier.reduce((total, item) => total + item.prix, 0);
    };


    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Mon Panier</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-1/4 py-2 px-4 text-left">Nom</th>
                            <th className="w-1/4 py-2 px-4 text-left">Marque</th>
                            <th className="w-1/4 py-2 px-4 text-left">Taille (ml)</th>
                            <th className="w-1/4 py-2 px-4 text-left">Prix (MAD)</th>
                            <th className="w-1/4 py-2 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {panier.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border-t py-2 px-4">{item.nom}</td>
                                <td className="border-t py-2 px-4">{item.marque}</td>
                                <td className="border-t py-2 px-4">{item.quantite}</td>
                                <td className="border-t py-2 px-4">{item.prix}</td>
                                <td className="border-t py-2 px-4">
                                    <button
                                        onClick={() => supprimerDuPanier(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                         <tr className="bg-gray-200">
                            <td className="py-2 px-4 font-bold" colSpan="3">Total</td>
                            <td className="py-2 px-4 font-bold">{calculerTotal()} MAD</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MonPanier;
