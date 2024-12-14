
import React, { createContext, useState } from 'react';

export const PanierContext = createContext();

export const PanierProvider = ({ children }) => {
    const [panier, setPanier] = useState([]);

    const ajouterAuPanier = (parfum) => {
        setPanier([...panier, parfum]);
        alert(`Le parfum ${parfum.nom} a été ajouté au panier`)
    };
    const supprimerDuPanier = (index) => {
        setPanier(panier.filter((_, i) => i !== index));
    };
    
    

    return (
        <PanierContext.Provider value={{ panier, ajouterAuPanier,supprimerDuPanier }}>
            {children}
        </PanierContext.Provider>
    );
};
