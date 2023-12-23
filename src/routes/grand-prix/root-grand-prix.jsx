import React from 'react';
import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation} from "react-router-dom";
import { createGrandPrix, getGrandsPrix } from "../../controller/grands-prix";

export async function loader() {
    const grandsPrix = await getGrandsPrix();
    return { grandsPrix }
}

export async function action() {
    const grandPrix  = await createGrandPrix();
    return redirect(`/grands-prix/${grandPrix.id}/edit`);
}

export default function RootCircuit() {
    const { grandsPrix } = useLoaderData();
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
              {grandsPrix.length ? (
                <ul>
                  {grandsPrix.map((grandPrix) => (
                    <li key={grandPrix.id}>
                      <NavLink
                        to={`/grands-prix/${grandPrix.id}`}
                        className={({ isActive, isPending }) =>
                          isActive
                            ? "active"
                            : isPending
                            ? "pending"
                            : ""
                        }
                      >
                        {grandPrix.nom ? (
                          <>
                            {grandPrix.nom }
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
                  <i>No grands prix</i>
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