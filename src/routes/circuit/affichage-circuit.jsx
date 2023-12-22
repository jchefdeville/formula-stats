import { Form, useLoaderData, NavLink } from "react-router-dom";
import { getCircuit } from "../../controller/circuits";

export async function loader({ params }) {
    const circuit = await getCircuit(params.idCircuit);
    return { circuit }
}

export default function Circuit() {
  const { circuit } = useLoaderData();

  return (
    <div id="circuit">

      <div>
        <img
          key={circuit.avatar}
          src={circuit.avatar || null}
          alt="circuit"
          width={100}
        />
      </div>

      <div>
        <h1>
          {circuit.nom}
        </h1>
        
        {circuit.notes && <p>{circuit.notes}</p>}

        <div id="boutons">
          <Form action="edit">
            <button className="btn btn-primary" type="submit">Modifier le circuit</button>
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
            <button className="btn btn-danger" type="submit">Supprimer le circuit</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
