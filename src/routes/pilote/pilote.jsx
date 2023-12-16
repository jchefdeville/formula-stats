import { Form, useLoaderData  } from "react-router-dom";
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
