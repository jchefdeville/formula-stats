import React from 'react';
import { Outlet, NavLink, useNavigation} from "react-router-dom";

export default function Root() {
    const navigation = useNavigation();
    return (
      <>
        <div id="sidebar" className="rootbar">

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

                  <li>
                    <NavLink
                      to="grands-prix"
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }
                    >
                    Grands Prix
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="circuits"
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }
                    >
                    Circuits
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