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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement : <ErrorPage/>,
    loader : rootLoader,
    action : rootAction,
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
    }]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
