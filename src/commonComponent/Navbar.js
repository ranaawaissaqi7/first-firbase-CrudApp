import React from 'react'
import { NavLink } from 'react-router-dom';
export default function Navbar() {
  return (
   <>
               <ul className="nav nav-pills justify-content-center bg-dark ">
                <li className="nav-item ">
                    <NavLink className="nav-link text-white " aria-current="page" to="/">AddUser</NavLink>
                </li>
                <li className="nav-item ">
                    <NavLink className="nav-link text-white " aria-current="page" to="/allUsers">AllUsers</NavLink>
                </li>

            </ul>
   </>
  )
}
