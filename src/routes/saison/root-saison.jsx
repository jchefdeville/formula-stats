import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation} from "react-router-dom";
import { getSaisons, createSaison } from "../../controller/saisons";

export async function loader() {
    const saisons = await getSaisons();
    return { saisons }
}

export async function action() {
    const saison  = await createSaison();
    return redirect(`/saisons/${saison.id}/edit`);
}

export default function RootSaison() {
    const { saisons } = useLoaderData();
    const navigation = useNavigation();
    return (
      <>
        <div id="sidebar">

          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search saisons"
                placeholder="Rechercher saison"
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
              <button className="btn btn-success" type="submit">Nouvelle Saison</button>
            </Form>
          </div>
          <nav>
            <nav>
              {saisons.length ? (
                <ul>
                  {saisons.map((saison) => (
                    <li key={saison.id}>
                      <NavLink
                        to={`/saisons/${saison.id}`}
                        className={({ isActive, isPending }) =>
                          isActive
                            ? "active"
                            : isPending
                            ? "pending"
                            : ""
                        }
                      >
                        {saison.annee ? (
                          <>
                            {saison.annee}
                          </>
                        ) : (
                          <i>No Année</i>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  <i>No saisons</i>
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