import { useState } from 'react';
import { app } from 'firebaseApp';
import { getAuth } from 'firebase/auth';

import Router from './components/Router';

function App() {
  const auth = getAuth(app);
  console.log('auth:::', auth);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  return (
    <>
      <Router isAuthenticated={isAuthenticated} />
    </>
  );
}

export default App;
