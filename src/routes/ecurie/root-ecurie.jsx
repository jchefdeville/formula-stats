import React from 'react';
import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation} from "react-router-dom";
import { getEcuries, createEcurie } from "../../controller/ecuries";

export async function loader() {
    const ecuries = await getEcuries();
    return { ecuries }
}

export async function action() {
    const ecurie  = await createEcurie();
    return redirect(`/ecuries/${ecurie.id}/edit`);
}

export default function RootEcurie() {
    const { ecuries } = useLoaderData();
    const navigation = useNavigation();
    return (
      <>
        <div id="sidebar">

          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search ecuries"
                placeholder="Rechercher ecurie"
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
              <button className="btn btn-success" type="submit">Nouvelle Ecurie</button>
            </Form>
          </div>
          <nav>
            <nav>
          {ecuries.length ? (
            <ul>
              {ecuries.map((ecurie) => (
                <li key={ecurie.id}>
                  <NavLink
                    to={`/ecuries/${ecurie.id}`}
                    style={{ color: ecurie.couleur }}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {ecurie.nom ? (
                      <>
                        {ecurie.nom }
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
              <i>No ecuries</i>
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