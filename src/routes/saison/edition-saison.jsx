import React from 'react';
import { Form, useLoaderData, redirect } from "react-router-dom";
import { updateSaison } from '../../saisons';

export async function action({request, params}) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateSaison
    (params.idPilote, updates);
    return redirect(`/saisons/${params.idPilote}`);
}

export default function EditSaison() {
  const { saison } = useLoaderData();

  const handleCancel = () => {
    redirect(`/saisons/${saison.id}`);
  };

  return (
    <Form method="post" id="saison-form">
      <h1>EDITION SAISON</h1>
      <div>
        <span>Année</span>
        <input
          placeholder="Année"
          aria-label="Année"
          type="number"
          name="annee"
          defaultValue={saison.annee}
        />
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