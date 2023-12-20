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
          <nav>
            <nav>
              <ul>
                  <li>
                    <NavLink
                      to="pilotes"
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }
                    >
                    Pilotes
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="ecuries"
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }
                    >
                    Ecuries
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="saisons"
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }
                    >
                    Saisons
                    </NavLink>
                  </li>
              </ul>
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