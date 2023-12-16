import { Form, useLoaderData, redirect } from "react-router-dom";
import { updateEcurie } from "../../ecuries";

export async function action({request, params}) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateEcurie(params.idEcurie, updates);
    return redirect(`/ecuries/${params.idEcurie}`);
}


export default function EditEcurie() {
  const { ecurie } = useLoaderData();

  return (
    <Form method="post" id="ecurie-form">
      <h1>EDITION ECURIE</h1>
      <p>
        <span>Name</span>
        <input
          placeholder="Nom"
          aria-label="Last name"
          type="text"
          name="nom"
          defaultValue={ecurie.nom}
        />
      </p>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={ecurie.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={ecurie.notes}
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