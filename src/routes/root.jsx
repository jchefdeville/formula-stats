import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation} from "react-router-dom";
import { getPilotes, createPilote } from "../pilotes";

export async function loader() {
    const pilotes = await getPilotes();
    return { pilotes }
}

export async function action() {
    const pilote  = await createPilote();
    return redirect(`/pilotes/${pilote.id}/edit`);
}

export default function Root() {
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
                placeholder="Search"
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
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            <nav>
          {pilotes.length ? (
            <ul>
              {pilotes.map((pilote) => (
                <li key={pilote.id}>
                  <NavLink
                    to={`pilotes/${pilote.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {pilote.first || pilote.last ? (
                      <>
                        {pilote.first} {pilote.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {pilote.favorite && <span>★</span>}
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