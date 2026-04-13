import React, { useState } from 'react'
import { socket } from '../utils/socketInit';
import { link } from '../utils/makeRandomLink';
import { useNavigate } from 'react-router';

function Homepage() {

  const navigate = useNavigate();
  const [name, setName] = useState("");

    const getName = (e) => {
      setName(e.target.value);
    }

    const initiate = () => {

      if(!name){
        alert("please enter username to continue!")
        return;
      }

        const callLink = link();
        console.log(callLink);
        socket.emit("initiate-call", {id:socket.id, name});
        console.log(socket);
        navigate(`/call/${callLink}`);
    }



  return (
    <div>
      <input type="text" name="username" id="username" placeholder='what shall we call you!' onChange={getName} required/>
      <button type='submit' onClick={initiate}>Start socket call</button>
    </div>
  )
}

export default Homepage
