import React from 'react';
import { Form, useLoaderData, redirect } from "react-router-dom";
import { getPilotes, getPilote, updatePilote } from "../../controller/pilotes";
import { useEffect, useState } from "react";

export async function action({request, params}) {
  const formData = await request.formData();
  const selectedPiloteId = formData.get("idPilote");
  
  // Vérifier si l'ID du pilote est valide (non vide, non null, etc.)
  if (selectedPiloteId) {
      const pilote = await getPilote(selectedPiloteId);

      // Assurez-vous que le pilote a été trouvé
      if (pilote) {
          pilote.idEcurie = params.idEcurie;
          await updatePilote(selectedPiloteId, pilote);
      }
  }

  return redirect(`/ecuries/${params.idEcurie}`);
}

export default function AddPiloteToEcurie() {
  const { ecurie } = useLoaderData();

  const [pilotes, setPilotes] = useState([]);

  useEffect(() => {
    const fetchPilotesWithoutEcurie = async () => {
      const pilotesData = await getPilotes();
  
      // TODO : se baser plutôt sur l'écurie à null
      const pilotesWithoutEcurie = pilotesData.filter((pilote) => {
        return !(pilote.idEcurie !== null && pilote.idEcurie !== '--');
      });
  
      setPilotes(pilotesWithoutEcurie);
    };
  
    fetchPilotesWithoutEcurie();
  }, []);

  return (
    <Form method="post" id="ecurie-form">
      <h1>AJOUT PILOTE A {ecurie.nom.toUpperCase()}</h1>

      <div>
        <span>Pilotes sans écurie</span> 
        <select name="idPilote">
          <option>--</option>
          {pilotes.map((pilotes, index) => (
            <option key={index} value={pilotes.id}>
              {pilotes.nom}
            </option>
          ))}
        </select>
      </div>

      <div id="boutons">
        <p>
          <button type="button" className="btn btn-danger">Annuler</button>
          <button type="submit" className="btn btn-success">Enregistrer</button>
        </p>
      </div>
    </Form>
  );
}