import React from 'react';
import { Form, useLoaderData } from "react-router-dom";
import { getGrandPrix } from "../../controller/grands-prix";

export async function loader({ params }) {
    const grandPrix = await getGrandPrix(params.idGrandPrix);
    return { grandPrix }
}

export default function Circuit() {
  const { grandPrix } = useLoaderData();

  return (
    <div id="grandPrix">

      <div>
        <img
          key={grandPrix.avatar}
          src={grandPrix.avatar || null}
          alt="grandPrix"
          width={100}
        />
      </div>

      <div>
        <h1>
          {grandPrix.nom}
          {grandPrix.idSaison} {grandPrix.idCircuit}
        </h1>
        
        {grandPrix.notes && <p>{grandPrix.notes}</p>}

        <div id="boutons">
          <Form action="edit">
            <button className="btn btn-primary" type="submit">Modifier le grand prix</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button className="btn btn-danger" type="submit">Supprimer le grand prix</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
