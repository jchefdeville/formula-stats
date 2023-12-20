import { Form, useLoaderData, NavLink } from "react-router-dom";
import { getPilote } from "../../pilotes";

export async function loader({ params }) {
    const pilote = await getPilote(params.idPilote);
    return { pilote }
}

export default function Pilote() {
  const { pilote } = useLoaderData();

  return (
    <div id="pilote">

      <div>
        <img
          key={pilote.avatar}
          src={pilote.avatar || null}
          width={100}
        />
      </div>

      <div>
        <h1>
          {pilote.prenom} {' '}
          <span style={{ color: pilote.ecurie && pilote.ecurie.couleur }}>
            {pilote.nom}
          </span>
          {pilote.numero && <> #{pilote.numero}</>}
        </h1>

        {pilote.ecurie && (
          <div>
            <h2>Ecurie</h2>
            <NavLink
              key={pilote.ecurie.id}
              to={`/ecuries/${pilote.ecurie.id}`}
              style={{ color: pilote.ecurie.couleur }}
              className={({ isActive, isPending }) =>
                isActive
                  ? "active"
                  : isPending
                  ? "pending"
                  : ""
              }
              >
              {pilote.ecurie.nom}
            </NavLink>
          </div>
        )}

        {pilote.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${pilote.twitter}`}
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
