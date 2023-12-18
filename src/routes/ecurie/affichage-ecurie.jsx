import { Form, useLoaderData, NavLink  } from "react-router-dom";
import { getEcurie } from "../../ecuries";

export async function loader({ params }) {
    const ecurie = await getEcurie(params.idEcurie);
    return { ecurie }
}

export default function Ecurie() {
    const { ecurie } = useLoaderData();

  return (
    <div id="ecurie">
      <div>
        <img
          key={ecurie.avatar}
          src={ecurie.avatar || null}
          width={100}
        />
      </div>

      <h1>DETAIL ECURIE</h1>

      <div>
        <h1 style={{ color: ecurie.couleur }}>
          {ecurie.nom}
        </h1>

        {ecurie.pilotes.length && (
          <div>
            <h2>Pilotes</h2>
            {ecurie.pilotes.map((pilote) => (
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

        {ecurie.notes && <p>{ecurie.notes}</p>}

        <div id="boutons">
          <Form action="edit">
            <button type="submit">Modifier l'écurie</button>
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
            <button type="submit">Supprimer écurie</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
