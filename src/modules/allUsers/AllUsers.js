import React from 'react';
import { collection, getDocs,  doc, deleteDoc } from "firebase/firestore/lite";
import { db } from '../../config/firebase';
import { useState, useEffect } from 'react';
import{Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AllUsers.css";
export default function AllUsers() {
    //loading state
    const [isLoading, setIsLoading] = useState(true)
    // create a State
    const [allUsers, setAllUsers] = useState([]);

    //readDocsFunction
    const readDocs = async () => {
        let array = [];
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            console.log("data :",doc.data())
            array.push({ ...doc.data(), id: doc.id })
        });
        setAllUsers(array)
        setIsLoading(false)
    }
    //ondeleteHandler
    const onDeleteHandler =async(item)=>{
      const{id}=item
      try {
        await deleteDoc(doc(db, "users", id));
        let newAllUsers= allUsers.filter((item)=>{
          return item.id!==id
        })
        setAllUsers(newAllUsers)
        toast.success('User has been Deleted!', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
       //alert("Delete User Sucessfuly !")  
      } catch (error) {
        alert(error)
      }
      
    }

    useEffect(() => {
        readDocs()
    }, [])

    return (
        <>

<div className='container-fluid allUser-main-body vh-100 '>
        <div className='row'>
          <div className='col-md-12 col-12 '>


            <div className='container mt-5'>
              <div className='row justify-content-center'>
                <div className='col-md-4 text-center text-white '>
                  <h1>All Users</h1>

                </div>
              </div>
            </div>
            {
              isLoading ? (<> <h1 className='text-white text-center'>Loading Data Please waite...</h1></>)
                : (<>
                  <div className='container'>
                    <div className='row '>
                      <div className='col-md-12 table-responsive text-center '>

                        <table className="table table-dark table-striped table-hover  ">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Email</th>
                              <th>Phone No.</th>
                              <th>Age</th>
                              <th className=' text-center'>Actions</th>
                            </tr>
                          </thead>


                          {
                            allUsers.map((item, i) => {
                              return <tbody>

                                <tr>
                                  <th>{i+1}</th>
                                  <td>{item.fname}</td>
                                  <td>{item.lname}</td>
                                  <td>{item.email}</td>
                                  <td>{item.phone}</td>
                                  <td>{item.age}</td>
                                  <td>
                                    <Link className='btn btn-outline-primary ms-md-2' to={`/viewUser/${item.id}`}> View</Link>
                                    <Link  className='btn btn-outline-warning ms-md-2' to={`/editUser/${item.id}`}>Edit</Link>
                                    <button className='btn btn-outline-danger ms-md-2 mt-md-0 mt-2' onClick={()=>{onDeleteHandler(item)}}>Delete</button>
                                    
                                  </td>
                                </tr>

                              </tbody>
                            })
                          }


                        </table>
                      </div>
                    </div>
                  </div>
                </>)
            }
          </div>
        
        </div>
      </div>
      <ToastContainer/>
        </>
    )
}
