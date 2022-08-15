import React from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import { useState } from 'react';
import {
  BrowserRouter as 
  Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Login';

function App() {
  const [user, setUser] = useState(null)
  return (
    <div className="app">
      <div className='app__body'>

        <Router>
          <Routes>
            <Route path='/' element={<Sidebar />} />
            <Route path='/rooms/:roomId' element={<><Sidebar /> <Chat /></>} />
          </Routes>
        </Router>

      </div>
      
    </div>
  );
}

export default App;
