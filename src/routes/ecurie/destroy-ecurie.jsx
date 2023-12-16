import { redirect } from "react-router-dom";
import { deletePilote } from "../../pilotes";

export async function action({ params }) {
    await deletePilote(params.idPilote);
    return redirect("/");
}
