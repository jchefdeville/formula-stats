import React, { useEffect, useState } from 'react';
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { getEcuries } from "../../controller/ecuries";
import { updatePilote } from "../../controller/pilotes";

export async function action({request, params}) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updatePilote(params.idPilote, updates);
    return redirect(`/pilotes/${params.idPilote}`);
}

export default function EditPilote() {
  const { pilote } = useLoaderData();
  const [ecuries, setEcuries] = useState([]);
  const [selectedEcurie, setSelectedEcurie] = useState(pilote.idEcurie || "");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEcuries = async () => {
      const ecuriesData = await getEcuries();
      setEcuries(ecuriesData);
    };

    fetchEcuries();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedEcurie(e.target.value);
  };

  const handleCancel = () => {
    navigate(`/pilotes/${pilote.id}`);
  };

  return (
    <Form method="post" id="pilote-form">
      <h1>EDITION {pilote.nom || 'PILOTE'}</h1>
      <div>
        <span>Name</span>
        <input
          placeholder="Prénom"
          aria-label="First name"
          type="text"
          name="prenom"
          defaultValue={pilote.prenom}
        />
        <input
          placeholder="Nom"
          aria-label="Last name"
          type="text"
          name="nom"
          defaultValue={pilote.nom}
        />
      </div>

      <div>
      <span>Numéro</span>
        <input
          placeholder="Numéro"
          aria-label="Numéro"
          type="number"
          name="numero"
          defaultValue={pilote.numero}
        />
      </div>

      <div>
        <span>Ecurie</span> 
        <select name="idEcurie" value={selectedEcurie} onChange={handleSelectChange}>
          <option>--</option>
          {ecuries.map((ecurie, index) => (
            <option key={index} value={ecurie.id}>
                {ecurie.nom}
              </option>
          ))}
        </select>
      </div>
        
      <div>
        <label>
          <span>Avatar URL</span>
          <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            name="avatar"
            defaultValue={pilote.avatar}
          />
        </label>
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