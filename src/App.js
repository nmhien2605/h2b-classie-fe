// ** Router Import
import Router from "./router/Router";

import { SocketContext, useSocket } from "./utility/Socket";

const App = () => {
  const socketData = useSocket();
  return (
    <SocketContext.Provider value={socketData}>
      <Router />
    </SocketContext.Provider>
  );
};

export default App;
