import React, { useEffect, useState } from 'react'

function Talk(props) {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState({});
    const [allmessages, setAllmessages] = useState([])
    const [Socket, setSocket] = useState(null);

    useEffect(() => {
      const ws = new WebSocket('wss://nvdqwpdb-8000.inc1.devtunnels.ms/');
      setSocket(ws);
      ws.onmessage = (async(event)=>{
        const data = await JSON.parse(event.data);
        setAllmessages((prevmessages)=>[...prevmessages, data])
      })
      return ()=>{
        ws.close();
      }
    }, [])
    
    useEffect(() => {
      const getdata = async()=>{
        const response = await fetch('https://nvdqwpdb-8000.inc1.devtunnels.ms/talks/getchat', {
            method: "POST"
        })
        if(response.status == 200){
            const data = await response.json();
            setAllmessages(data)
        }
      }
      getdata();
    }, [])

    const handleSubmit = async()=>{
        if(Socket){
            const formdata = new FormData();
            formdata.append('name', props.details.name);
            formdata.append('message', message);
            if(file){
                const imageform = new FormData();
                imageform.append('name', props.details.name);
                imageform.append('image', file);
                const response = await fetch('https://nvdqwpdb-8000.inc1.devtunnels.ms/talks/imagestore', {
                    method: "POST",
                    body: imageform
                })
                console.log(response);
                const resp = await response.json();
                formdata.append('image', resp.url);
            }
            else{
                formdata.append('image', '');
            }
            const socketdata = {};
            formdata.forEach((val, key)=>{
                socketdata[key] = val;
            })
            Socket.send(JSON.stringify(socketdata));
        }
    }
    
  return (
    <div>
        <div>
            {allmessages.map((value, key)=>(
                <div key={key} className='text-white'>
                    <div>{value.name}</div>
                    <div>{value.message}</div>
                    {value.image ? <div><img src = {value.image} alt="no-image-produced" className={`w-full ${value.image == 'undefined' ? 'hidden' : 'none'}`}/></div>: <></>}
                </div>
            ))}
        </div>
        <div>
            <input type="text" value={message} onChange={(e)=>{setMessage(e.target.value)}} />
            <input type="file" onChange={(e)=>{setFile(e.target.files[0])}}/>
            <button type="submit" className='text-white' onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default Talk
