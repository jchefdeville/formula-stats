import { redirect } from "react-router-dom";
import { getPilote, updatePilote } from "../../pilotes";

export async function action({ params }) {
    let pilote = await getPilote(params.idPilote);

    pilote.idEcurie = null;

    await updatePilote(pilote.id, pilote);

    return redirect(`/ecuries/${params.idEcurie}`);
}
