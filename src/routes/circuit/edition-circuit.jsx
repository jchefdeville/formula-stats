import React from 'react';
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateCircuit } from "../../controller/circuits";

export async function action({request, params}) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateCircuit(params.idCircuit, updates);
    return redirect(`/circuits/${params.idCircuit}`);
}

export default function EditCircuit() {
  const { circuit } = useLoaderData();

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`/circuits/${circuit.id}`);
  };

  return (
    <Form method="post" id="circuit-form">
      <h1>EDITION {circuit.nom || 'CIRCUIT'}</h1>
      <div>
        <span>Name</span>
        <input
          placeholder="Nom"
          aria-label="Last name"
          type="text"
          name="nom"
          defaultValue={circuit.nom}
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