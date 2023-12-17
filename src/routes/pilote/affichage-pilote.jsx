import { Form, useLoaderData  } from "react-router-dom";
import { getPilote } from "../../pilotes";
import { getEcurie } from "../../ecuries";

export async function loader({ params }) {
    const pilote = await getPilote(params.idPilote);

    let ecurie = await getEcurie(pilote.idEcurie);
    pilote.ecurie = ecurie;

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
        />
      </div>

      <h1>DETAIL PILOTE</h1>

      <div>
        <h1>
          {pilote.prenom || pilote.nom ? (
            <>
              {pilote.prenom} {pilote.nom}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
        </h1>

        {pilote.ecurie && (
          <>
            <h2>Ecurie</h2>
            {pilote.ecurie.id} {pilote.ecurie.nom}
          </>
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
