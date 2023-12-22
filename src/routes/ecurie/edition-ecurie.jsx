import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateEcurie } from "../../controller/ecuries";

export async function action({request, params}) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateEcurie(params.idEcurie, updates);
    return redirect(`/ecuries/${params.idEcurie}`);
}


export default function EditEcurie() {
  const { ecurie } = useLoaderData();

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`/ecuries/${ecurie.id}`);
  };

  return (
    <Form method="post" id="ecurie-form">
      <h1>EDITION ECURIE</h1>

      <div>
        <span>Name</span>
        <input
          placeholder="Nom"
          aria-label="Last name"
          type="text"
          name="nom"
          defaultValue={ecurie.nom}
        />
      </div>

      <div>
        <span>Couleur</span>
        <input
          placeholder="#123456"
          aria-label="Couleur"
          type="text"
          name="couleur"
          defaultValue={ecurie.couleur}
        />
      </div>

      <div>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={ecurie.avatar}
        />
      </div>

      <div id="boutons">
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Annuler</button>
        <button type="submit" className="btn btn-success">Enregistrer</button>
      </div>
    </Form>
  );
}