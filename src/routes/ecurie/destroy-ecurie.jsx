import { redirect } from "react-router-dom";
import { deleteEcurie } from "../../ecuries";

export async function action({ params }) {
    await deleteEcurie(params.idEcurie);
    return redirect("/ecuries/");
}
