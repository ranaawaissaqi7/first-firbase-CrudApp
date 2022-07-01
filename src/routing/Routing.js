import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from '../commonComponent/Navbar'
import AddUser from '../modules/addUser/AddUser'
import AllUsers from '../modules/allUsers/AllUsers'
import EditUser from '../modules/editUser/EditUser'
import ViewUser from '../modules/viewUser/ViewUser'
export default function Routing() {
  return (
<>
<BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<AddUser/>} />
      <Route path="/allUsers" element={<AllUsers/>} />
      <Route path="/editUser/:id" element={<EditUser/>} />
      <Route path="/viewUser/:id" element={<ViewUser/>} />
      


      </Routes>
      </BrowserRouter>
</>
  )
}
