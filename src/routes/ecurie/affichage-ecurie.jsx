import { Form, useLoaderData, NavLink  } from "react-router-dom";
import { getEcurie } from "../../ecuries";
import { getPilotes } from "../../pilotes";

export async function loader({ params }) {
    const ecurie = await getEcurie(params.idEcurie);

    let pilotes = await getPilotes();
    pilotes = pilotes.filter((pilote) => {
      return pilote.idEcurie === ecurie.id
    });

    ecurie.pilotes = pilotes;

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
        />
      </div>

      <h1>DETAIL ECURIE</h1>

      <div>
        <h1>
          {ecurie.nom && (
            <>
              {ecurie.nom}
            </>
          )}
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

        {ecurie.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${ecurie.twitter}`}
            >
              {ecurie.twitter}
            </a>
          </p>
        )}

        {ecurie.notes && <p>{ecurie.notes}</p>}

        <div>
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
