import React from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useState } from 'react';

function Profile(props) {

  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState(props.details.name);
  const [editCollege, setEditCollege] = useState(props.details.college);
  const [editDepartment, setEditDepartment] = useState(props.details.department);
  const [editPassword, setEditPassword] = useState(props.details.password);
  const [editYear, setEditYear] = useState(props.details.year);

    const handleremove = async()=>{
        const response = await fetch(`${BACKEND_URL}/removeprofile`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: props.details.email,
            })
        })
        if(response.status === 200){
            document.cookie = `Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
            document.cookie = `ProfileInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
            window.location.href = '/';
        }
    }

    async function handleEdit() {
      try{
        const response = await axios.put(`${BACKEND_URL}/editprofile`, {
          body : JSON.stringify({
            name: editName,
            email: props.details.email,
            college: editCollege,
            department: editDepartment,
            password: editPassword,
            year: editYear,
          }),
        });
        if(response.status === 200){
          setEdit(false);
          window.location.reload();
        }
      } catch (error) {

        console.log(error);
        alert("Something went wrong");
      }
    }
    

  return (
    <div className='text-white p-6 rounded-lg shadow-lg w-full'>
      <h1 className='text-2xl font-bold my-6 flex justify-center'>Profile Information</h1>
      <div className='mb-2 bg-gray-800 py-4 flex px-12 gap-12 rounded-lg my-6'>
        <p className='text-lg font-semibold'>Name:</p>
        <p className='text-md'>{props.details.name}</p>
      </div>
      <div className='mb-2 bg-gray-800 py-4 flex px-12 gap-12 rounded-lg my-6'>
        <p className='text-lg font-semibold'>College:</p>
        <p className='text-md'>{props.details.college}</p>
      </div>
      <div className='mb-2 bg-gray-800 py-4 flex px-12 gap-12 rounded-lg my-6'>
        <p className='text-lg font-semibold'>Email:</p>
        <p className='text-md'>{props.details.email}</p>
      </div>
      <div className='mb-2 bg-gray-800 py-4 flex px-12 gap-12 rounded-lg my-6'>
        <p className='text-lg font-semibold'>Department:</p>
        <p className='text-md'>{props.details.department}</p>
      </div>
      <div className='mb-2 bg-gray-800 py-4 flex px-12 gap-12 rounded-lg my-6'>
        <p className='text-lg font-semibold'>Password:</p>
        <p className='text-md'>{props.details.password}</p>
      </div>
      <div className='mb-2 bg-gray-800 py-4 flex px-12 gap-12 rounded-lg my-6'>
        <p className='text-lg font-semibold'>Year:</p>
        <p className='text-md'>{props.details.year}</p>
      </div>
      <button 
        className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg my-4  w-fill' 
        onClick={handleremove}
      >
        Remove Profile
      </button>
      <button 
        className='bg-blue-600 hover:bg-blue-700 mx-4 text-white font-bold py-2 px-4 rounded-lg my-4  w-fill' 
        onClick={()=>setEdit(true)}
      >
        Edit Profile
      </button>

      <form className={edit? "bg-white p-8 rounded-lg shadow-md max-w-xl mx-auto" : "hidden"} onSubmit={handleEdit}>
  <div className="mb-6">
    <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="name">
      Name
    </label>
    <input
      type="text"
      id="name"
      className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={editName}
      onChange={(e) => setEditName(e.target.value)}
    />
  </div>
  <div className="mb-6">
    <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="college">
      College
    </label>
    <input
      type="text"
      id="college"
      className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={editCollege}
      onChange={(e) => setEditCollege(e.target.value)}
    />
  </div>
  <div className="mb-6">
    <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="department">
      Department
    </label>
    <input
      type="text"
      id="department"
      className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={editDepartment}
      onChange={(e) => setEditDepartment(e.target.value)}
    />
  </div>
  <div className="mb-6">
    <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="password">
      Password
    </label>
    <input
      type="password"
      id="password"
      className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={editPassword}
      onChange={(e) => setEditPassword(e.target.value)}
    />
  </div>
  <div className="mb-6">
    <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="year">
      Year
    </label>
    <input
      type="text"
      id="year"
      className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={editYear}
      onChange={(e) => setEditYear(e.target.value)}
    />
  </div>
  <div className="text-center">
    <button
      type="submit"
      className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
    >
      Submit
    </button>
  </div>
</form>


    </div>
  );
}

export default Profile;