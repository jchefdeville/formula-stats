import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation} from "react-router-dom";
import { getEcuries, createEcurie } from "../ecuries";

export async function loader() {
    const ecuries = await getEcuries();
    return { ecuries }
}

export async function action() {
    const ecurie  = await createEcurie();
    return redirect(`/ecuries/${ecurie.id}/edit`);
}

export default function EcurieRoot() {
    const { ecuries } = useLoaderData();
    const navigation = useNavigation();
    return (
      <>
        <div id="sidebar">

          <h1>React Router Ecuries</h1>
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
              <button type="submit">Nouvelle Ecurie</button>
            </Form>
          </div>
          <nav>
            <nav>
          {ecuries.length ? (
            <ul>
              {ecuries.map((ecurie) => (
                <li key={ecurie.id}>
                  <NavLink
                    to={`ecuries/${ecurie.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {ecurie.prenom || ecurie.nom ? (
                      <>
                        {ecurie.prenom} {ecurie.nom }
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {ecurie.favorite && <span>★</span>}
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