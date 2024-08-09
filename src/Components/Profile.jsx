import React from 'react';

function Profile(props) {

    const handleremove = async()=>{
        const response = await fetch("http://localhost:8000/removeprofile", {
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
    </div>
  );
}

export default Profile;6