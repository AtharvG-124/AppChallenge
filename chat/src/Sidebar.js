import React, { useEffect, useState } from 'react';
import "./Sidebar.css";
import { 
    MdAccountCircle, MdChat, MdOutlineDonutLarge,
    MdMoreVert, MdSearch
} from 'react-icons/md';
import SidebarChat from './SidebarChat';
import { collection, onSnapshot } from 'firebase/firestore';
import db from './firebase';

function Sidebar() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {

        const subColRef = collection(db, "Job Applicants", "4WADJdEOtK84sn2VBTZA", "ChatRooms");

        const unsubscribe = onSnapshot(subColRef, (snapshot) => 
           
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        );

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <MdAccountCircle className="acc" size={30} />

                <div className='sidebar__headerRight'>
                    <button className='button'>
                        <MdOutlineDonutLarge size={20} color='white'/>
                    </button>
                    <button className='button'>
                        <MdChat size={20} color='white'/>
                    </button>
                    <button className='button'>
                        <MdMoreVert size={20} color='white'/>
                    </button>
                </div>
            </div>

            <div className='sidebar__search'>
                <div className='sidebar__searchContainer'>
                    <MdSearch className='MdSearch' size={25}/>
                    <input placeholder='Search or start a new chat!' type='text' />
                </div>

            </div>

            <div className='sidebar__chats'>
                <SidebarChat addNewChat/>
                {rooms.map(room => {
                    return <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                })}
            </div>
        </div>
    )
}


export default Sidebar