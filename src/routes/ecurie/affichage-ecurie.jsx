import React from 'react';
import { Form, useLoaderData, NavLink  } from "react-router-dom";
import { getEcurie } from "../../controller/ecuries";
import { getPilotes } from '../../controller/pilotes';

export async function loader({ params }) {
    const ecurie = await getEcurie(params.idEcurie);

    let pilotes = await getPilotes();
    pilotes = pilotes.filter((pilote) => {
      return pilote.idEcurie === params.idEcurie
    });
    
    return { ecurie, pilotes };
}

export default function Ecurie() {
    const { ecurie, pilotes } = useLoaderData();

  return (
    <div id="ecurie">
      <div>
        <img
          key={ecurie.avatar}
          src={ecurie.avatar || null}
          alt="ecurie"
          width={100}
        />
      </div>

      <div>
        <div>
          <h1 style={{ color: ecurie.couleur }}>
            {ecurie.nom}
          </h1>
        </div>

        {pilotes.length > 0 && (
          <div>
            <h2>Pilotes</h2>
            {pilotes.map((pilote) => (
              <div key={pilote.id} className="d-flex align-items-center">
                <NavLink
                  to={`/pilotes/${pilote.id}`}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "active"
                      : isPending
                      ? "pending"
                      : ""
                  }
                  >
                  {pilote.prenom} {pilote.nom }
                </NavLink>

                <Form
                  method="delete"
                  action={`remove-pilote/${pilote.id}`}
                >
                  <button type="submit" className="btn btn-danger btn-sm ml-2" style={{marginLeft: '10px'}}>X</button>
                </Form>

              </div>
            ))}
          </div>
        )}

        <div>
          <NavLink to="add-pilote">
            <button type="submit" className="btn btn-info btn-sm ml-2" style={{marginTop: '10px'}}>Ajouter un pilote à l&apos;écurie</button>
          </NavLink>
        </div>

        <div id="boutons">
          <Form action="edit">
            <button type="submit" className="btn btn-primary">Modifier l&apos;écurie</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Êtes-vous sûr de vouloir supprimer cette écurie ?"
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn btn-danger">Supprimer l&apos;écurie</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
