import { Form, useLoaderData } from "react-router-dom";
import { getSaison } from "../../controller/saisons";

export async function loader({ params }) {
    const saison = await getSaison(params.idSaison);
    return { saison }
}

export default function Saison() {
  const { saison } = useLoaderData();

  return (
    <div id="saison">

      <div>
        <h1>
          Saison {saison.annee}
        </h1>

        <div id="boutons">
          <Form action="edit">
            <button className="btn btn-primary" type="submit">Modifier la saison</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
