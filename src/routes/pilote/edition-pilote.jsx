import { Form, useLoaderData, redirect } from "react-router-dom";
import { updatePilote } from "../../pilotes";

export async function action({request, params}) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updatePilote(params.idPilote, updates);
    return redirect(`/pilotes/${params.idPilote}`);
}


export default function EditPilote() {
  const { pilote } = useLoaderData();

  return (
    <Form method="post" id="pilote-form">
      <h1>EDITION PILOTE</h1>
      <p>
        <span>Name</span>
        <input
          placeholder="Prénom"
          aria-label="First name"
          type="text"
          name="prenom"
          defaultValue={pilote.prenom}
        />
        <input
          placeholder="Nom"
          aria-label="Last name"
          type="text"
          name="nom"
          defaultValue={pilote.nom}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={pilote.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={pilote.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={pilote.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}