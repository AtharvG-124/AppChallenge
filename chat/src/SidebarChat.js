import React, { useEffect, useState } from 'react'
import "./SidebarChat.css";
import { 
    MdAccountCircle
} from 'react-icons/md';
import db from './firebase.js'
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Link } from 'react-router-dom'


function SidebarChat({id, name, addNewChat}) {
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if (id) {
            const messagesRef = collection(db, "Job Applicants", "4WADJdEOtK84sn2VBTZA", "ChatRooms", id, "messages")
            const q = query(messagesRef, orderBy("timestamp", "desc"))
            onSnapshot(q, (snapshot) => (
                setMessages(snapshot.docs.map((doc) => (doc.data())))
            ))
        }
    }, [id])

    const createChat = () => {
        const roomName = prompt("Add a name for the chat room: ")

        if (roomName) {
            const subColRef = collection(db, "Job Applicants", "4WADJdEOtK84sn2VBTZA", "ChatRooms");
            addDoc(subColRef, {
                name: roomName
            });
        };
    };

    return !addNewChat ?(
    <Link to={`/rooms/${id}`}>
        <div className='sidebarChat'>
            <MdAccountCircle size={30} color="white"/>
            <div className='sidebarChat__info'>
                <h2>
                    {name}
                </h2>
                <div>
                    <p className='handle_overflow'>
                        {messages[0]?.message}
                    </p>
                </div>
                
            </div>
        </div>
    </Link>
    ): (
    <div onClick={createChat} className="sidebarChat">
        <h2>Add new chat</h2>
    </div>
    )
}

export default SidebarChat