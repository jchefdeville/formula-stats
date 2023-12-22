import { redirect } from "react-router-dom";
import { deleteEcurie } from "../../controller/ecuries";

export async function action({ params }) {
    await deleteEcurie(params.idEcurie);
    return redirect("/ecuries/");
}
