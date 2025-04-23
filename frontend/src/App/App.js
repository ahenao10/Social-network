import { useContext } from 'react';
import { AuthContext } from '../Context';
import LoginCard from '../Login-Card';
import SignUpCard from '../SingUp-Card';
import './App.css';
import Modals from '../Modals';
import AuthModal from '../Modals/AuthModal';

function App() {

  const {
    openAuthLoginModal,
    setOpenAuthLoginModal,
  } = useContext(AuthContext);

  return (
    <div className="App">
      {/* <SignUpCard /> */}
      <LoginCard />

      {openAuthLoginModal && (<Modals>
        <AuthModal setOpenAuthLoginModal={setOpenAuthLoginModal} />
      </Modals>)}
    </div>
  );
}

export default App;
