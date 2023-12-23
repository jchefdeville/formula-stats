import { redirect } from "react-router-dom";
import { deleteGrandPrix } from "../../controller/grands-prix";

export async function action({ params }) {
    await deleteGrandPrix(params.idGrandPrix);
    return redirect("/grands-prix/");
}
