import React from 'react';
import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation} from "react-router-dom";
import { getCircuits, createCircuit } from "../../controller/circuits";

export async function loader() {
    const circuits = await getCircuits();
    return { circuits }
}

export async function action() {
    const circuit  = await createCircuit();
    return redirect(`/circuits/${circuit.id}/edit`);
}

export default function RootCircuit() {
    const { circuits } = useLoaderData();
    const navigation = useNavigation();

    return (
      <>
        <div id="sidebar">

          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search circuits"
                placeholder="Rechercher circuit"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <Form method="post">
              <button className="btn btn-success" type="submit">Nouveau Circuit</button>
            </Form>
          </div>
          <nav>
            <nav>
              {circuits.length ? (
                <ul>
                  {circuits.map((circuit) => (
                    <li key={circuit.id}>
                      <NavLink
                        to={`/circuits/${circuit.id}`}
                        className={({ isActive, isPending }) =>
                          isActive
                            ? "active"
                            : isPending
                            ? "pending"
                            : ""
                        }
                      >
                        {circuit.nom ? (
                          <>
                            {circuit.nom }
                          </>
                        ) : (
                          <i>No Name</i>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  <i>No circuits</i>
                </p>
              )}
            </nav>
          </nav>
        </div>
        <div id="detail"
            className={
                navigation.state === "loading" ? "loading" : ""
            }>
            <Outlet/>
        </div>
      </>
    );
  }