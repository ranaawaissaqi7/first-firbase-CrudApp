import React, { useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { db } from '../../config/firebase';
import { useParams, useNavigate } from 'react-router-dom';

import "./EditUser.css"

export default function EditUser() {
  const { id } = useParams("")
  //UseNavigate
  const navigate=useNavigate("")

  console.log("id :", id)
  //create a state
  const [users, setUsers] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    age: "",
  })
  //onChangeHandler
  const onChangeHandler = (e) => {
    setUsers(s => ({ ...s, [e.target.name]: e.target.value }))
  }
  //onUpdateHadler

  const onUpdateHadler = async(e) => {
    try {
      e.preventDefault();
    const {fname,lname,email,phone,age}=users

    const washingtonRef = doc(db, "users", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      fname,
      lname,
      email,
      phone,
      age
    });
    alert("Update Successfuly Done!")
 
    navigate("/allUsers")

    } catch (error) {
      alert(error)
    }

  }
  //read a deucoment
  const readDoc = async () => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUsers(docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  useEffect(() => {
    readDoc()
  }, [])
  return (
    <>
      <div className='container-fluid  main-bg-color vh-100'>
        <div className='row'>
          <div className='col-12'>

            <div className='container mt-5'>
              <div className='row justify-content-center'>
                <div className='col-md-4 text-center text-warning '>
                  <h1>Edit User</h1>
                </div>
              </div>
            </div>

            <div className='container mt-2'>
              <div className='row justify-content-center '>
                <div className='col-md-4 update-form-layout'>
                  <form>
                    <div className="mb-3 mt-3">
                      <input type="text" className="form-control" placeholder="First Name" name="fname" defaultValue={users.fname} onChange={onChangeHandler}  />
                    </div>
                    <div className="mb-3 mt-3">
                      <input type="text" className="form-control" placeholder="Last Name" name="lname" defaultValue={users.lname} onChange={onChangeHandler} />
                    </div>
                    <div className="mb-3 mt-3">
                      <input type="email" className="form-control" placeholder="Enter Email" name="email" defaultValue={users.email} onChange={onChangeHandler} />
                    </div>
                    <div className="mb-3 mt-3">
                      <input type="number" className="form-control" placeholder="Phone No." name="phone" defaultValue={users.phone} onChange={onChangeHandler} />
                    </div>
                    <div className="mb-3 mt-3">
                      <input type="number" className="form-control" placeholder="Enter Age" name="age" defaultValue={users.age} onChange={onChangeHandler} />
                    </div>

                    <div className="mb-3 mt-3">
                      <button className='col-12 btn btn-outline-warning' onClick={onUpdateHadler} >Update User</button>
                    </div>

                  </form>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
     
    </>
  )
}
