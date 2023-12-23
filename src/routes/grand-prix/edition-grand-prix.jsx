import React, { useEffect, useState } from 'react';
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { getCircuits } from "../../controller/circuits";
import { updateGrandPrix } from '../../controller/grands-prix';
import { getSaisons } from '../../controller/saisons';

export async function action({request, params}) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateGrandPrix(params.idGrandPrix, updates);
    return redirect(`/grands-prix/${params.idGrandPrix}`);
}

export default function EditGrandPrix() {
  const { grandPrix } = useLoaderData();
  const [saisons, setSaisons] = useState([]);
  const [selectedSaison, setSelectedSaison] = useState(grandPrix.idSaison || "");
  const [circuits, setCircuits] = useState([]);
  const [selectedCircuit, setSelectedCircuit] = useState(grandPrix.idCircuit || "");

  useEffect(() => {
    const fetchSaisons = async () => {
      const saisonsData = await getSaisons();
      setSaisons(saisonsData);
    };

    const fetchCircuits = async () => {
      const circuitsData = await getCircuits();
      setCircuits(circuitsData);
    };

    fetchSaisons();
    fetchCircuits();
  }, []);

  const handleSelectChangeSaison = (e) => {
    setSelectedSaison(e.target.value);
  };

  const handleSelectChangeCircuit = (e) => {
    setSelectedCircuit(e.target.value);
  };


  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`/grands-prix/${grandPrix.id}`);
  };

  return (
    <Form method="post" id="circuit-form">
      <h1>EDITION {grandPrix.nom || 'GRAND-PRIX'}</h1>
      <div>
        <span>Name</span>
        <input
          placeholder="Nom"
          aria-label="Last name"
          type="text"
          name="nom"
          defaultValue={grandPrix.nom}
        />
      </div>

      <div>
        <span>Saison</span> 
        <select name="idSaison" value={selectedSaison} onChange={handleSelectChangeSaison}>
          <option>--</option>
          {saisons.map((saison, index) => (
            <option key={index} value={saison.id}>
              {saison.annee}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span>Circuit</span> 
        <select name="idCircuit" value={selectedCircuit} onChange={handleSelectChangeCircuit}>
          <option>--</option>
          {circuits.map((circuit, index) => (
            <option key={index} value={circuit.id}>
              {circuit.nom}
            </option>
          ))}
        </select>
      </div>
      
      <div id="boutons">
        <p>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Annuler</button>
          <button type="submit" className="btn btn-success">Sauvegarder</button>
        </p>
      </div>
    </Form>
  );
}