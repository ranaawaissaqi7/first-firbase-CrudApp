
import React, { useEffect, useState } from 'react'
import { doc, getDoc} from "firebase/firestore/lite";
import { db } from '../../config/firebase';
import { useParams } from 'react-router-dom';
import "./ViewUser.css";
export default function ViewUser() {
    //UseParams hook
    const { id } = useParams("")
    //loading state
    const [isLoading, setIsLoading] = useState(true)
    console.log("id :", id)
    //create a state
    const [users, setUsers] = useState({
      fname: "",
      lname: "",
      email: "",
      phone: "",
      age: "",
    })

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
    setIsLoading(false)
  }
  useEffect(() => {
    readDoc()
  }, [])

  return (
    <>
    <div className='container-fluid allUser-main-body vh-100 '>
        <div className='row'>
          <div className='col-md-12 col-12 '>


            <div className='container mt-5'>
              <div className='row justify-content-center'>
                <div className='col-md-4 text-center text-white '>
                  <h1>User ID</h1>

                </div>
              </div>
            </div>
            {
              isLoading ? (<> <h1 className='text-white text-center'>Loading Data Please waite...</h1></>)
                : (<>
                  <div className='container'>
                    <div className='row justify-content-center'>
                      <div className='col-md-6 table-responsive text-center '>

                        <table className="table table-dark table-striped table-hover  ">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>{id}</th>
                            </tr>
                            <tr>
                              <th>First Name</th>
                              <th>{users.fname}</th>
                            </tr>
                            <tr>
                              <th>Last Name</th>
                              <th>{users.lname}</th>
                            </tr>
                            <tr>
                              <th>email</th>
                              <th>{users.email}</th>
                            </tr>
                            <tr>
                              <th>PHONE NO.</th>
                              <th>{users.phone}</th>
                            </tr>
                            <tr>
                              <th>Age</th>
                              <th>{users.age}</th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                    </div>
                  </div>
                </>)
            }
          </div>
        
        </div>
      </div>
    </>
  )
}
