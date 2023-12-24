import React from 'react';
import { Form, useLoaderData, NavLink } from "react-router-dom";
import { getPilote } from "../../controller/pilotes";
import { getEcurie } from '../../controller/ecuries';

export async function loader({ params }) {
    const pilote = await getPilote(params.idPilote);

    const ecurie = await getEcurie(pilote.idEcurie);

    return { pilote, ecurie }
}

export default function Pilote() {
  const { pilote, ecurie } = useLoaderData();

  return (
    <div id="pilote">

      <div>
        <img
          key={pilote.avatar}
          src={pilote.avatar || null}
          alt="pilote"
          width={100}
        />
      </div>

      <div>
        <h1>
          {pilote.prenom} {' '}
          <span style={{ color: ecurie && ecurie.couleur }}>
            {pilote.nom}
          </span>
          {pilote.numero && <> #{pilote.numero}</>}
        </h1>

        {ecurie && (
          <div>
            <h2>Ecurie</h2>
            <NavLink
              key={ecurie.id}
              to={`/ecuries/${ecurie.id}`}
              style={{ color: ecurie.couleur }}
              className={({ isActive, isPending }) =>
                isActive
                  ? "active"
                  : isPending
                  ? "pending"
                  : ""
              }
              >
              {ecurie.nom}
            </NavLink>
          </div>
        )}

        {pilote.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${pilote.twitter}`}
              rel="noreferrer"
            >
              {pilote.twitter}
            </a>
          </p>
        )}

        {pilote.notes && <p>{pilote.notes}</p>}

        <div id="boutons">
          <Form action="edit">
            <button className="btn btn-primary" type="submit">Modifier le pilote</button>
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
            <button className="btn btn-danger" type="submit">Supprimer le pilote</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
