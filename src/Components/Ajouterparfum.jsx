import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddParfumForm = () => {
    const [formData, setFormData] = useState({
        nom: '',
        marque: '',
        type: '',
        genre: '',
        prix: '',
        quantite: '',
        qtestock: '',
        description: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:3001/parfums', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 201) {
                alert('Parfum ajouté avec succès!');
                setFormData({
                    nom: '',
                    marque: '',
                    type: '',
                    genre: '',
                    prix: '',
                    quantite: '',
                    qtestock: '',
                    description: '',
                    image: null
                });
            } else {
                alert('Erreur: ' + response.data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Erreur lors de l\'ajout du parfum.');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Ajouter un Parfum</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nom" className="block text-gray-700 font-medium mb-2">Nom:</label>
                    <input 
                        type="text" 
                        id="nom" 
                        name="nom" 
                        value={formData.nom} 
                        onChange={handleChange} 
                        required 
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>

                <div>
                    <label htmlFor="marque" className="block text-gray-700 font-medium mb-2">Marque:</label>
                    <input 
                        type="text" 
                        id="marque" 
                        name="marque" 
                        value={formData.marque} 
                        onChange={handleChange} 
                        required 
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>

                <div>
                    <label htmlFor="type" className="block text-gray-700 font-medium mb-2">Type:</label>
                    <input 
                        type="text" 
                        id="type" 
                        name="type" 
                        value={formData.type} 
                        onChange={handleChange} 
                        required 
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>

                <div>
                    <label htmlFor="genre" className="block text-gray-700 font-medium mb-2">Genre:</label>
                    <input 
                        type="text" 
                        id="genre" 
                        name="genre" 
                        value={formData.genre} 
                        onChange={handleChange} 
                        required 
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>

                <div>
                    <label htmlFor="prix" className="block text-gray-700 font-medium mb-2">Prix:</label>
                    <input 
                        type="number" 
                        id="prix" 
                        name="prix" 
                        value={formData.prix} 
                        onChange={handleChange} 
                        required 
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>

                <div>
                    <label htmlFor="quantite" className="block text-gray-700 font-medium mb-2">Quantité:</label>
                    <input 
                        type="number" 
                        id="quantite" 
                        name="quantite" 
                        value={formData.quantite} 
                        onChange={handleChange} 
                        required 
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>

                <div>
                    <label htmlFor="qtestock" className="block text-gray-700 font-medium mb-2">Quantité en stock:</label>
                    <input 
                        type="text" 
                        id="qtestock" 
                        name="qtestock" 
                        value={formData.qtestock} 
                        onChange={handleChange} 
                        required 
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description:</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        required 
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Image:</label>
                    <input 
                        type="file" 
                        id="image" 
                        name="image" 
                        onChange={handleFileChange} 
                        required 
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>

                <div className="text-center">
                    <button 
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                    >
                        Ajouter Parfum
                    </button>
                </div>
                <Link to={`/signin`} className="mt-4 text-blue-500 hover:underline">Revenir</Link>
            </form>
        </div>
    );
};

export default AddParfumForm;
