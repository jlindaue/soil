import { useState } from 'react';
import PageWrapper from './PageWrapper';
import { AppContext, OrderContext, defaultNotificationState, defaultOrderState, defaultUserState } from './commons/state';
import useLocalStorage from './hooks/useLocalStorage';


function App() {
  const [user, setUser] = useLocalStorage("user", defaultUserState);
  const [order, setOrder] = useLocalStorage("cart", defaultOrderState);
  const [notification, setNotification] = useState(defaultNotificationState);

  return (
    <div className="body">
      <AppContext.Provider value={{user,notification,setUser,setNotification}}>
        <OrderContext.Provider value={{order, setOrder}}>
          <PageWrapper />
        </OrderContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
