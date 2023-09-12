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
import { useDispatch, useSelector } from 'react-redux';
import { addPc, updatedPcStatus } from '../../redux/PcSlice';
import { removeCustomer } from '../../redux/customerSlice';
import { useRouter } from 'next/router';


const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPcMenu, setShowPcMenu] = useState(false);
  const [pcs, setPc] = useState([]);
  const [error, setError] = useState('');
  const [timers, setTimers] = useState({}); // Store timers for each PC
  const [selectedPc, setSelectedPc] = useState(null); // Track the selected PC

  const currentCustomer = useSelector((state) => state.customer.customers);
  const pcStatus = useSelector((state) => state.pc.pcs)

  const router = useRouter();
  const dispatch = useDispatch();


  const handleShowPcMenu = (e) => {
    e.stopPropagation();
    setShowPcMenu(!showPcMenu);
  };

  useEffect(() => {
    fetchPc();
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

  const startTimer = (pcId, duration) => {
    const newTimers = { ...timers };
    newTimers[pcId] = duration;
    setTimers(newTimers);


    setTimeout(() => {
      // Decrement the timer every second
      const updatedTimers = { ...timers };
      if (updatedTimers[pcId] > 0) {
        updatedTimers[pcId]--;
        setTimers(updatedTimers);
      }
    }, 1000);
  };

  useEffect(() => {
    // Check timers and remove customers when their timer reaches 0
    for (const pcId in timers) {
      if (timers[pcId] === 0) {
        dispatch(updatedPcStatus({ pcId, newStatus: "available" }))
      }
    }
  }, [timers]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleCardClick = (pc) => {
    setSelectedPc(pc); // Set the selected PC when a card is clicked, including its ID
    setShowMenu(true); // Show the form
    dispatch(addPc({pcId:pc._id, pcName:pc.name, pcStatus:pc.status}))
    dispatch(updatedPcStatus({ pcId:pc._id, newStatus: 'available' }));
  };

  const handleTimerComplete = (pcId) => {
    // Change the PC state to "available" when the timer reaches zero

    // Reset the timer to 0
    const updatedTimers = { ...timers };
    updatedTimers[pcId] = 0;
    setTimers(updatedTimers);

    dispatch(updatedPcStatus({ pcId, newStatus: 'available' }));
    dispatch(removeCustomer())
  };

  const addCustomer = async () => {
    try {
      await axios.post("/api/customers", currentCustomer);
    } catch (error) {
      console.log(error)
    }
  };

  const handleStartButtonClick = (pcId, duration) => {
    // Dispatch the updatePcStatus action to set the status to "online"
    dispatch(updatedPcStatus({ pcId, newStatus: 'online' }));

    // Start the timer
    startTimer(pcId, duration);
    addCustomer();
  };
  


  return (
    <div className="bg-[#f1f1f1]">
      <Nav />
      <div className="w-full sticky top-0 bg-[f1f1f1] justify-between items-center flex px-10 z-10 py-5 border-b-2 border-slate-400">
        <div className="flex items-center w-[70%] justify-between px-3">
          <div className="flex items-center py-2 space-x-3 text-green-600">
            <p>Online: </p> <span>{pcStatus.filter((pc) => pc.pcStatus === 'online').length} PC(s)</span>
          </div>
          <div className="flex items-center py-2 space-x-3 text-blue-600">
            <p>Available: </p> <span>{pcStatus.filter((pc) => pc.pcStatus === 'available').length} PC(s)</span>
          </div>
          <div className="flex items-center py-2 space-x-3 text-black">
            <p>Booked: </p> <span>{pcStatus.filter((pc) => pc.pcStatus === 'booked').length} PC(s)</span>
          </div>
          <div className="flex items-center py-2 space-x-3 text-red-600">
            <p>Disconnected: </p> <span>{pcStatus.filter((pc) => pc.pcStatus === 'disconnected').length} PC(s)</span>
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
          {showMenu && <ManagementForm showMenu={showMenu}
            setShowMenu={setShowMenu}
            selectedPc={selectedPc} 
            pcStatus={pcStatus}/>}
          {showPcMenu && <AddNewPc showPcMenu={showPcMenu} setShowPcMenu={setShowPcMenu} />}
          {pcs.map((pc) => {

            const pcCustomer = currentCustomer.filter((customer) => customer.pcId === pc._id)
            let statusStyle = '';
            const pcStatusFromRedux = pcStatus.find((pcStatus) => pcStatus.pcId === pc._id);

            if (pcStatusFromRedux) {
              switch (pcStatusFromRedux.pcStatus) {
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
            }

            // const currentCustomer = getCurrentCustomer(pc._id, pc.status);
            return (
              <Card key={pc._id} className={statusStyle ? statusStyle : styles.available}>
                <div className="flex justify-between items-center text-black">
                  <div className="rounded-lg px-2 py-1 font-semibold uppercase bg-white text-blue-900">{pc.name}</div>
                  <div className="text-black">
                    <MdMoreVert size={25} role="button" onClick={() => handleCardClick(pc)} />
                  </div>
                </div>

                <div className="font-extrabold text-xl mt-5 text-black text-center uppercase">{pc.type}</div>
                <div className="font-semibold text-xl mt-5 text-black text-center">{pcStatusFromRedux ? pcStatusFromRedux.pcStatus : 'available'}</div>

                <div className="text-black justify-center items-center">
                  {pcCustomer.map((customer, index) => (
                    <div key={index} className='items-center justify-center flex flex-col'>
                      <div className="text-lg font-bold my-2 text-center">{customer.name}</div>
                      <div className="text-sm my-3 text-center">{customer.date}</div>
                      {!timers[pc._id] ? (
                        <div className='absolute bottom-3 items-center justify-center w-full right-2 left-5'>
                        <button onClick={() => handleStartButtonClick(pc._id, customer.duration)} className='py-1 w-[80%] items-center text-white bg-[#0762EA] px-2'>
                          Start
                        </button>
                        </div>
                      ) : (
                        <CountdownCircleTimer
                          isPlaying
                          duration={customer.duration}
                          colors={[['#F7931A']]}
                          size={100}
                          onComplete={() => handleTimerComplete(pc._id)}
                        >
                          {({ remainingTime }) => (
                            <div className="timer">
                              <div className="text">{formatTime(remainingTime)}</div>
                            </div>
                          )}
                        </CountdownCircleTimer>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Auth(Dashboard);
