import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root, 
{ loader as rootLoader,
action as rootAction } 
from "./routes/root";

import ErrorPage from "./error-page";

// Pilotes
import Pilote, { loader as piloteLoader } from "./routes/pilote/pilote";
import EditionPilote, {action as editPiloteAction} from "./routes/pilote/edition-pilote";
import { action as destroyPiloteAction } from "./routes/pilote/destroy-pilote";

// Ecuries
import Ecurie, { loader as ecurieLoader } from "./routes/ecurie/ecurie";
import EditionEcurie, {action as editEcurieAction} from "./routes/ecurie/edition-ecurie";
import { action as destroyEcurieAction } from "./routes/ecurie/destroy-ecurie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement : <ErrorPage/>,
    loader : rootLoader,
    action : rootAction,

    // Pilotes
    children : [{
      path: "pilotes/:idPilote/",
      element : <Pilote/>,
      loader: piloteLoader,
    },
    {
      path: "pilotes/:idPilote/edit",
      element : <EditionPilote/>,
      loader: piloteLoader,
      action: editPiloteAction
    },
    {
      path: "pilotes/:idPilote/destroy",
      action: destroyPiloteAction,
    },

    // Ecuries
    {
      path: "ecuries/:idEcurie/",
      element : <Ecurie/>,
      loader: ecurieLoader,
    },
    {
      path: "ecuries/:idEcurie/edit",
      element : <EditionEcurie/>,
      loader: ecurieLoader,
      action: editEcurieAction
    },
    {
      path: "ecuries/:idEcurie/destroy",
      action: destroyEcurieAction,
    }
  ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
