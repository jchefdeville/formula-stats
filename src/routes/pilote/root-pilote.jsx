import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation} from "react-router-dom";
import { getPilotes, createPilote } from "../../pilotes";

export async function loader() {
    const pilotes = await getPilotes();
    return { pilotes }
}

export async function action() {
    const pilote  = await createPilote();
    return redirect(`/pilotes/${pilote.id}/edit`);
}

export default function RootPilote() {
    const { pilotes } = useLoaderData();
    const navigation = useNavigation();
    return (
      <>
        <div id="sidebar">

          <h1>React Router Pilotes</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search pilotes"
                placeholder="Rechercher pilote"
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
              <button type="submit">Nouveau Pilote</button>
            </Form>
          </div>
          <nav>
            <nav>
              {pilotes.length ? (
                <ul>
                  {pilotes.map((pilote) => (
                    <li key={pilote.id}>
                      <NavLink
                        to={`/pilotes/${pilote.id}`}
                        className={({ isActive, isPending }) =>
                          isActive
                            ? "active"
                            : isPending
                            ? "pending"
                            : ""
                        }
                      >
                        {pilote.prenom || pilote.nom ? (
                          <>
                            {pilote.prenom} {pilote.nom }
                          </>
                        ) : (
                          <i>No Name</i>
                        )}{" "}
                        {pilote.numero && <> #{pilote.numero}</>}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  <i>No pilotes</i>
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