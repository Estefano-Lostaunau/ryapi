import React from 'react';
import ApiForm from '../components/ApiForm';
import ApiList from '../components/ApiList';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ApiForm />
      <ApiList />
    </div>
  );
};

export default Home;