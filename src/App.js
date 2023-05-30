import useAuth from './context/useAuth'
import React from 'react';
import RoutesComp from './Routes';
import { NotificationContainer } from 'react-notifications';
import { AuthProvider } from './context/AuthContex';

function App() {
  const { user, setUser } = useAuth();

   


  return (
    <AuthProvider>
      <div>
        <RoutesComp />
        <NotificationContainer />
      </div>
    </AuthProvider>
  
  );
}

export default App;