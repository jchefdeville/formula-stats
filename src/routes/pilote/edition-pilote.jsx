import React, { useEffect, useState } from 'react';
import { Form, useLoaderData, redirect } from "react-router-dom";
import { getEcuries } from "../../ecuries";
import { updatePilote } from "../../pilotes";

export async function getListeEcuries() {
  return await getEcuries();
}

export async function action({request, params}) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updatePilote(params.idPilote, updates);
    return redirect(`/pilotes/${params.idPilote}`);
}


export default function EditPilote() {
  const { pilote } = useLoaderData();
  const [ecuries, setEcuries] = useState([]);

  useEffect(() => {
    const fetchEcuries = async () => {
      const ecuriesData = await getListeEcuries();
      setEcuries(ecuriesData);
    };

    fetchEcuries();
  }, []);

  return (
    <Form method="post" id="pilote-form">
      <h1>EDITION PILOTE</h1>
      <p>
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
      </p>

      <select name="idEcurie">
        <option>Merci de sélectionner une écurie</option>
        {ecuries.map((ecurie, index) => (
          <option key={index} value={ecurie.id}>{ecurie.nom}</option>
        ))}
      </select>

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
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={pilote.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}