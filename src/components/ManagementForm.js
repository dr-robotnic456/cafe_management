    import React, { useEffect, useState } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { addCustomer } from '../../redux/customerSlice';
import { updatedPcStatus } from '../../redux/PcSlice';

const ManagementForm = ({ showMenu, setShowMenu, selectedPc }) => {
    const dispatch = useDispatch();
    const [customer, setCustomer] = useState({
      name: '',
      contact: '',
      address: '',
      date: '',
      duration: '',
      amount: '',
      time: '',
    });
    const [error, setError] = useState('');
    const customers = useSelector((state) => state.customer.customers);
  
    // Use useEffect to update the form data when a new PC is selected
    useEffect(() => {
      if (selectedPc) {
        // Check if there's existing customer data for the selected PC
        const existingCustomer = customers.find((c) => c.pcId === selectedPc._id);
        if (existingCustomer) {
          // Populate the form with existing customer data
          setCustomer(existingCustomer);
        } else {
          // Reset the form when a new PC is selected
          setCustomer({
            name: '',
            contact: '',
            address: '',
            date: '',
            duration: '',
            amount: '',
            time: ''
          });
        }
      }
    }, [selectedPc, customers]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCustomer({
        ...customer,
        [name]: value,
      });
    };
  
    const handleAddCustomer = (e) => {
      e.preventDefault();
  
      // Add validation logic here if needed
      if (!customer.name || !customer.contact || !customer.address || !customer.date || !customer.duration || !customer.amount || !customer.time) {
        setError('Please provide all credentials');
        return;
      }
  
      // Include the PC information in the customer data
      const customerData = {
        ...customer,
        pcId: selectedPc._id, // Include the selected PC's ID
      };
  
      // Dispatch the addCustomer action with the customer data
      dispatch(addCustomer(customerData));
      dispatch(updatedPcStatus({pcId:selectedPc._id, newStatus: "booked"}))
  
      // Clear the form fields and error message
      setCustomer({
        name: '',
        contact: '',
        address: '',
        date: '',
        duration: '',
        amount: '',
        time: '',
      });
      setError('');
  
      // Close the form
      setShowMenu(false);
    };

    return (
        <div className='fixed inset-0 flex flex-col justify-center items-center z-50 bg-opacity-50 bg-black'>
        <div className=' z-0 flex justify-end px-10 absolute top-0 right-6'>
            <button className='font-extrabold text-[100px] cursor-pointer' onClick={() => setShowMenu(false)}>
            x
            </button>
        </div>
        {showMenu && (
            <div className='w-[500px] bg-[#f1f1f1] rounded-lg py-10'>
            {/* <h1 className='text-center font-bold text-3xl uppercase text-black'>Customer Information</h1> */}
            <form className='px-10 w-full py-4 mx-auto rounded-lg text-black' onSubmit={handleAddCustomer}>
                <div className='my-5'>
                <input type='text' name='name' id='name' className='w-full px-3 py-2' placeholder='Name' value={customer.name} onChange={handleInputChange} />
                </div>
                <div className='my-5'>
                <input type='text' name='contact' id='contact' className='w-full px-3 py-2' placeholder='Contact' value={customer.contact} onChange={handleInputChange} />
                </div>
                <div className='my-5'>
                <input type='text' name='address' id='address' className='w-full px-3 py-2' placeholder='Address' value={customer.address} onChange={handleInputChange} />
                </div>
                <div className='my-5'>
                <input type='date' name='date' id='date' className='w-full px-3 py-2' placeholder='Date' value={customer.date} onChange={handleInputChange} />
                </div>
                <div className='my-5'>
                <input type='text' name='duration' id='duration' className='w-full px-3 py-2' placeholder='Duration' value={customer.duration} onChange={handleInputChange} />
                </div>
                <div className='my-5'>
                <input type='text' name='amount' id='amount' className='w-full px-3 py-2' placeholder='Amount' value={customer.amount} onChange={handleInputChange} />
                </div>
                <div className='my-5'>
                <input type='time' name='time' id='time' className='w-full px-3 py-2' placeholder='Time' value={customer.time} onChange={handleInputChange} />
                </div>
                <div className='items-center justify-center flex bg-[#0762EA]'>
                <button type='submit' className='uppercase w-full text-white py-2'>
                    Book
                </button>
                </div>
                {/* Display error message if there's an error */}
                {error && <div className='text-red-500 mt-2'>{error}</div>}
            </form>
            </div>
        )}
        </div>
    );
    };

    export default ManagementForm;
