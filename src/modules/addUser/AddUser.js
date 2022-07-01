import React from 'react'
import { useState } from 'react';
import { collection, addDoc,} from "firebase/firestore/lite"
import { db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

import "./AddUser.css";
export default function AddUser() {
    const[users,setUsers]=useState({
        fname:"",
        lname:"",
        email:"",
        phone:"",
        age:"",
    })
    //UseNavigate hook
    const navigate=useNavigate()
    const onChangeHandler =(e)=>{
      setUsers(s=>({...s,[e.target.name]: e.target.value}))
    }
    const onSubmitHandler= async(e)=>{
        e.preventDefault();
        const  {fname,lname,email,phone,age}=users
        if (!fname) {
          return alert("Please Fill First Name!")
        }
        if(!lname){
          return alert("Please Fill Last Name!")
        }
        if(!email){
          return alert("Please Fill Email!")
        }
        if(!phone){
          return alert("Please Fill Phone!")
        }

        if(!age){
          return alert("Please Fill Age!")
        }
        try {
            const docRef = await addDoc(collection(db, "users"), {
              fname,
              lname,
              email,
              phone,
              age
            });
            console.log("Document written with ID: ", docRef.id);
            navigate("/allUsers")

          } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error ",e)
          }
          
    }

  return (
 <>
 <div className='container-fluid  main-bg-color vh-100'>
        <div className='row'>
          <div className='col-12'>

            <div className='container mt-5'>
              <div className='row justify-content-center'>
                <div className='col-md-4 text-center text-white '>
                  <h1>Add User</h1>
                </div>
              </div>
            </div>

            <div className='container mt-2'>
              <div className='row justify-content-center '>
                <div className='col-md-4 bg-dark form-layout'>
                  <form>
                    <div className="mb-3 mt-3">
                      <input type="text"   className="form-control"  placeholder="First Name" name="fname" onChange={ onChangeHandler}   />
                    </div>
                    <div className="mb-3 mt-3">
                      <input type="text"  className="form-control"  placeholder="Last Name" name="lname" onChange={ onChangeHandler}    />
                    </div>
                    <div className="mb-3 mt-3">
                      <input type="email"  className="form-control"  placeholder="Enter Email" name="email" onChange={ onChangeHandler}   />
                    </div>
                    <div className="mb-3 mt-3">
                      <input type="number" className="form-control"  placeholder="Phone No." name="phone" onChange={ onChangeHandler}   />
                    </div>
                    <div className="mb-3 mt-3">
                      <input type="number"  className="form-control"  placeholder="Enter Age" name="age"   onChange={ onChangeHandler} />
                    </div>

                     <div className="mb-3 mt-3">
                      <button className='col-12 btn btn-outline-success' onClick={ onSubmitHandler}>Add User</button>
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
