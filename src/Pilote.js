import React from 'react';
import Ecurie from './Ecurie';

const pilot1 = {
    'id':1,
    'prenom':"Lewis",
    'nom':"Hamilton",
    'ecurie': Ecurie.ecurie1
}

const pilot2 = {
    'id':2,
    'prenom':"Max",
    'nom':"Verstappen",
    'ecurie': Ecurie.ecurie2  // Ajout de la propriété ecurie pour le pilote2
}

const pilotes = [pilot1, pilot2];

const Pilote = () => {
    return (
      <div>

        <h2>Welcome!</h2>
        <p>La page des pilotes</p>
        {pilotes.map((pilote) => (
            <div key={pilote.id}>
                {pilote.prenom} {pilote.nom.toUpperCase()} {pilote.ecurie.nom}
            </div>
        ))}

      </div>
    );
  };

export default Pilote;