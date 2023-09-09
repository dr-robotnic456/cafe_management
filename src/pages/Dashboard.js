import AddNewPc from '@/components/AddNewPc';
import Card from '@/components/Card';
import ManagementForm from '@/components/ManagementForm';
import Nav from '@/components/Nav';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdMoreVert } from 'react-icons/md';
import styles from '../styles/cardStatus.module.css';
import Auth from '@/components/Auth';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';


const Dashboard = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showPcMenu, setShowPcMenu] = useState(false);
    const [pcs, setPc] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState('');
    const [timers, setTimers] = useState({}); // Store timers for each PC
  
    const handleShowMenu = (e) => {
      e.stopPropagation();
      setShowMenu(!showMenu);
    };
  
    const handleShowPcMenu = (e) => {
      e.stopPropagation();
      setShowPcMenu(!showPcMenu);
    };
  
    useEffect(() => {
      fetchPc();
      fetchCustomers();
    }, []);
  
    const fetchPc = async () => {
      try {
        const response = await axios.get('/api/pc');
        setPc(response.data);
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.message);
        } else {
          setError('An error occurred fetching data.');
        }
      }
    };
  
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/api/customers');
        setCustomers(response.data);
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.message);
        } else {
          setError('An error occurred fetching data.');
        }
      }
    };
  
    const startTimer = (pcId, duration) => {
      const newTimers = { ...timers };
      newTimers[pcId] = true;
      setTimers(newTimers);
  
      setTimeout(() => {
        // Timer completion logic here
        console.log(`Timer for PC ID ${pcId} completed`);
        
        // Reset the timer
        const updatedTimers = { ...timers };
        updatedTimers[pcId] = false;
        setTimers(updatedTimers);
      }, duration * 1000); // Convert seconds to milliseconds
    };


  return (
    <div className="bg-[#f1f1f1]">
      <Nav />
      <div className="w-full sticky top-0 bg-[f1f1f1] justify-between items-center flex px-10 z-10 py-5 border-b-2 border-slate-400">
        <div className="flex items-center w-[70%] justify-between px-3">
          <div className="flex items-center py-2 space-x-3 text-green-600">
            <p>Online: </p> <span>{pcs.filter((pc) => pc.status === 'online').length} PC(s)</span>
          </div>
          <div className="flex items-center py-2 space-x-3 text-blue-600">
            <p>Available: </p> <span>{pcs.filter((pc) => pc.status === 'available').length} PC(s)</span>
          </div>
          <div className="flex items-center py-2 space-x-3 text-black">
            <p>Booked: </p> <span>{pcs.filter((pc) => pc.status === 'booked').length} PC(s)</span>
          </div>
          <div className="flex items-center py-2 space-x-3 text-red-600">
            <p>Disconnected: </p> <span>{pcs.filter((pc) => pc.status === 'disconnected').length} PC(s)</span>
          </div>
        </div>
        <div>
          <button className="bg-[#0762EA] py-2 px-3 rounded-lg" onClick={handleShowPcMenu}>
            Add New Pc
          </button>
        </div>
      </div>

      <div className="">
        <div className='z-0 px-5 py-10 grid grid-cols-4 gap-10 overflow-y-auto h-[460px]'>
          {showMenu && <ManagementForm showMenu={showMenu} setShowMenu={setShowMenu} />}
          {showPcMenu && <AddNewPc showPcMenu={showPcMenu} setShowPcMenu={setShowPcMenu} />}
          {pcs.map((pc) => {
            let statusStyle = '';

            switch (pc.status) {
              case 'booked':
                statusStyle = styles.booked;
                break;
              case 'online':
                statusStyle = styles.online;
                break;
              case 'available':
                statusStyle = styles.available;
                break;
              case 'disconnected':
                statusStyle = styles.disconnected;
                break;
              default:
                statusStyle = ''; // Default style
            }

            return (
              <Card key={pc._id} className={statusStyle}>
                <div className="flex justify-between items-center text-black">
                  <div className="rounded-lg px-2 py-1 font-semibold uppercase bg-white text-blue-900">{pc.name}</div>
                  <div className="text-black">
                    <MdMoreVert size={25} role="button" onClick={handleShowMenu} />
                  </div>
                </div>

                <div className="font-extrabold text-xl mt-5 text-black">{pc.type}</div>

                <div className="font-semibold text-xl mt-5 text-black">{pc.status}</div>
                <div className="absolute bottom-3 text-black">
                  {customers.map((customer) => (
                    <div key={customer._id}>
                      <div className="text-base">{customer.name}</div>
                      <div className="text-sm">{customer.date}</div>
                      {!timers[pc._id] ? (
                        <button onClick={() => startTimer(pc._id, customer.duration)} className='py-1 text-white bg-[#0762EA] px-2'>
                          Start
                        </button>
                      ) : (
                        <CountdownCircleTimer
                          isPlaying
                          duration={customer.duration}
                          colors={[['#F7931A']]}
                          size={120}
                          onComplete={() => console.log(`Timer for PC ID ${pc._id} completed`)}
                        >
                          {({ remainingTime }) => (
                            <div className="timer">
                              <div className="text">{remainingTime}</div>
                            </div>
                          )}
                        </CountdownCircleTimer>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Auth(Dashboard);
