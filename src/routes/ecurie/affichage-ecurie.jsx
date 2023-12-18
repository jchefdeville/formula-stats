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
              <div key={pilote.id}>
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
                  {pilote.favorite && <span>★</span>}
                </NavLink>
              </div>
            ))}
          </div>
        )}

        {ecurie.notes && <p>{ecurie.notes}</p>}

        <div id="boutons">
          <Form action="edit">
            <button type="submit">Edit</button>
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
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
