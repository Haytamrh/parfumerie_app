import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const AccountA = () => {
    const [Email, setEmail] = useState("");
    const [Mot_De_Passe, setMot_De_Passe] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInscription = (e) => {
        e.preventDefault();

        if (Email === 'admin@gmail.com' && Mot_De_Passe === '12345') {
            navigate('/ajouterprod');
        } else if (Email === 'user1@gmail.com' && Mot_De_Passe === '12345') {
            navigate('/');
        } else {
            setError('Email ou mot de passe incorrect');
        }
    };

    return (
        <div className="flex flex-row justify-center items-center">
            <div className="w-1/2 pl-40">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl font-semibold mb-4">Inscription</h1>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <form onSubmit={handleInscription}>
                            <div className="mb-4">
                                <label htmlFor="email" className="text-gray-600">Email</label><br />
                                <input type='text' id="email" value={Email} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="text-gray-600">Mot de passe</label><br />
                                <input type="password" id="password" value={Mot_De_Passe} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full" onChange={e => setMot_De_Passe(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                                    Connexion
                                </button>
                                {error && <div className="text-red-500 mt-2">{error}</div>}
                            </div>
                        </form>
                    </div>
                    <Link to={`/`} className="mt-4 text-blue-500 hover:underline">Revenir</Link>
                </div>
            </div>
        </div>
    );
}

export default AccountA;
