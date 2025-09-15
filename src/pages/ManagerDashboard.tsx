import React from 'react'
import Header from '../Components/HeaderDash';
import ManagerSideBar from '../manager/ManagerSideBar';

const ManagerDashboard:React.FC = () => {
  return (
    <div className=''>
     <div>
         <Header/>
     <ManagerSideBar/>
     </div>
<main>
    <div className='ml-70 '> 
    <p className='text-black font-bold mt-20'>Manage your team members and their status</p>
    </div>
</main>
    </div>
  )
}

export default ManagerDashboard;
