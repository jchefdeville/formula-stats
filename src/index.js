import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./routes/root";

import ErrorPage from "./error-page";

// Pilotes
import PiloteRoot, { loader as rootPiloteLoader, action as rootPiloteAction } from "./routes/pilote/root-pilote";
import Pilote, { loader as piloteLoader } from "./routes/pilote/affichage-pilote";
import EditionPilote, {action as editPiloteAction} from "./routes/pilote/edition-pilote";
import { action as destroyPiloteAction } from "./routes/pilote/destroy-pilote";

// Ecuries
import EcurieRoot, { loader as rootEcurieLoader, action as rootEcurieAction } from "./routes/ecurie/root-ecurie";
import Ecurie, { loader as ecurieLoader } from "./routes/ecurie/affichage-ecurie";
import EditionEcurie, {action as editEcurieAction} from "./routes/ecurie/edition-ecurie";
import { action as destroyEcurieAction } from "./routes/ecurie/destroy-ecurie";
import { action as removePiloteFromEcurieAction } from "./routes/ecurie/remove-pilote-from-ecurie";
import AddPiloteToEcurie, { action as addPiloteToEcurieAction } from "./routes/ecurie/add-pilote-to-ecurie";

// Saisons
import SaisonRoot, { loader as rootSaisonLoader, action as rootSaisonAction } from "./routes/saison/root-saison";
import Saison, {loader as saisonLoader} from "./routes/saison/affichage-saison";
import EditSaison, { action as editSaisonAction } from "./routes/saison/edition-saison";

// Grands Prix
import GrandPrixRoot, { loader as rootGrandPrixLoader, action as rootGrandPrixAction } from "./routes/grand-prix/root-grand-prix";
import GrandPrix, { loader as grandPrixLoader } from "./routes/grand-prix/affichage-grand-prix";
import EditionGrandPrix, {action as editGrandPrixAction} from "./routes/grand-prix/edition-grand-prix";
import { action as destroyGrandPrixAction } from "./routes/grand-prix/destroy-grand-prix";

// Circuits
import CircuitRoot, { loader as rootCircuitLoader, action as rootCircuitAction } from "./routes/circuit/root-circuit";
import Circuit, { loader as circuitLoader } from "./routes/circuit/affichage-circuit";
import EditionCircuit, {action as editCircuitAction} from "./routes/circuit/edition-circuit";
import { action as destroyCircuitAction } from "./routes/circuit/destroy-circuit";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement : <ErrorPage/>,

    // Pilotes
    children : [{
      path: "/pilotes/",
      element : <PiloteRoot/>,
      loader: rootPiloteLoader,
      action : rootPiloteAction
    },
    {
      path: "/pilotes/:idPilote/",
      element : <Pilote/>,
      loader: piloteLoader
    },
    {
      path: "/pilotes/:idPilote/edit",
      element : <EditionPilote/>,
      loader: piloteLoader,
      action: editPiloteAction
    },
    {
      path: "/pilotes/:idPilote/destroy",
      action: destroyPiloteAction
    },

    // Ecuries
    {
      path: "/ecuries/",
      element : <EcurieRoot/>,
      loader: rootEcurieLoader,
      action: rootEcurieAction
    },
    {
      path: "/ecuries/:idEcurie/",
      element : <Ecurie/>,
      loader: ecurieLoader
    },
    {
      path: "/ecuries/:idEcurie/edit",
      element : <EditionEcurie/>,
      loader: ecurieLoader,
      action: editEcurieAction
    },
    {
      path: "/ecuries/:idEcurie/destroy",
      action: destroyEcurieAction
    },
    {
      path: "/ecuries/:idEcurie/remove-pilote/:idPilote",
      action: removePiloteFromEcurieAction
    },
    {
      path: "/ecuries/:idEcurie/add-pilote",
      element : <AddPiloteToEcurie/>,
      loader: ecurieLoader,
      action: addPiloteToEcurieAction
    },

    // Saisons
    {
      path: "/saisons/",
      element : <SaisonRoot/>,
      loader: rootSaisonLoader,
      action : rootSaisonAction
    },
    {
      path: "/saisons/:idSaison/",
      element : <Saison/>,
      loader: saisonLoader
    },
    {
      path: "/saisons/:idSaison/edit",
      element : <EditSaison/>,
      loader: saisonLoader,
      action: editSaisonAction
    },

    // Grands Prix
    {
      path: "/grands-prix/",
      element : <GrandPrixRoot/>,
      loader: rootGrandPrixLoader,
      action : rootGrandPrixAction
    },
    {
      path: "/grands-prix/:idGrandPrix/",
      element : <GrandPrix/>,
      loader: grandPrixLoader
    },
    {
      path: "/grands-prix/:idGrandPrix/edit",
      element : <EditionGrandPrix/>,
      loader: grandPrixLoader,
      action: editGrandPrixAction
    },
    {
      path: "/grands-prix/:idGrandPrix/destroy",
      action: destroyGrandPrixAction
    },

    // Circuits
    {
      path: "/circuits/",
      element : <CircuitRoot/>,
      loader: rootCircuitLoader,
      action : rootCircuitAction
    },
    {
      path: "/circuits/:idCircuit/",
      element : <Circuit/>,
      loader: circuitLoader
    },
    {
      path: "/circuits/:idCircuit/edit",
      element : <EditionCircuit/>,
      loader: circuitLoader,
      action: editCircuitAction
    },
    {
      path: "/circuits/:idCircuit/destroy",
      action: destroyCircuitAction
    },
  ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
