import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, onSnapshot, orderBy, query, addDoc, serverTimestamp } from 'firebase/firestore';
import db from './firebase';
import "./Chat.css";
import { 
    MdAccountCircle, MdOutlineTagFaces, MdOutlineMic,
    MdMoreVert, MdSearch, MdAttachFile
} from 'react-icons/md';
import { useState } from 'react';
import { useRef } from 'react';

function Chat() {
    const bottomRef = useRef(null);
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (roomId) {
            const subColRef = doc(db, "Job Applicants", "4WADJdEOtK84sn2VBTZA", "ChatRooms", roomId);
            onSnapshot(subColRef, (snapshot) => 
                setRoomName(snapshot.data().name)
            )

            const messagesRef = collection(db, "Job Applicants", "4WADJdEOtK84sn2VBTZA", "ChatRooms", roomId, "messages")
            const q = query(messagesRef, orderBy("timestamp", "asc"))
            onSnapshot(q, (snapshot) => (
                setMessages(snapshot.docs.map((doc) => (doc.data())))
            ))
        }
    }, [roomId])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);

        const messagesRef = collection(db, "Job Applicants", "4WADJdEOtK84sn2VBTZA", "ChatRooms", roomId, "messages")
        addDoc(messagesRef, {
            message: input,
            name: "testing rn",
            timestamp: serverTimestamp() 
        })

        setInput("");

    }

  return (
    <div className='chat'>
        <div className="chat__header">
            <MdAccountCircle size={30} color="white"/>
            <div className="chat__headerInfo">
                <h3>{roomName}</h3>
                <p>
                    Last seen{" "}
                    {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toLocaleString()}
                </p>
                
            </div>

            <div className="chat_headerRight">
                <button className='button'>
                    <MdSearch size={25} color='white' />
                </button>
                <button className='button'>
                    <MdAttachFile size={25} color='white' />
                </button>
                <button className='button'>
                    <MdMoreVert size={25} color='white' />
                </button>
            </div>
        </div>

        <div className="chat__body">

            {messages.map(message => (
                <p className={`chat__message ${true &&'chat__reciever'}`}> 
                {/* add message.name =-= user.displayName before &&chat__reciever*/}
                    <span className="chat__name">
                        {message.name}
                    </span>
                    {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toLocaleString()}
                    </span>
                </p>
            ))}
            
            <div ref={bottomRef} />
        </div>

        <div className="chat__footer">
            <MdOutlineTagFaces className='footerIcons' size={25} color='white'/>
            <form>
                <input value={input} onChange={ e => setInput(e.target.value)} type="text" placeholder='Type a message . . .'/>
                <button type="submit" onClick={sendMessage} className='chat__submitButton'>send a message</button>
            </form>
            <MdOutlineMic className='footerIcons' size={25} color='white'/>
        </div>
    </div>

  )
}

export default Chat