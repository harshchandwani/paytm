// Dashboard.js
import React from 'react';
import { Appbar } from '../components/AppBar';
import { Balance } from '../components/Balance';
import { Users } from '../components/Users';

const Dashboard = () => {
  return (
    <div className='m-10'>
      <Appbar />
      <Balance />
      <Users />
    </div>
  );
};

export default Dashboard;
