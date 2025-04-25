import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../Context';
import LoginCard from '../Login-Card';
import SignUpCard from '../SingUp-Card';
import './App.css';
import Modals from '../Modals';
import AuthModal from '../Modals/AuthModal'; 

function App() {

  const {
    openAuthLoginModal,
    setOpenAuthLoginModal
  } = useContext(AuthContext);

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/' element=<LoginCard /> />
          <Route path='/register' element=<SignUpCard /> />
        </Routes>
      </Router>
      {/* {openRegisterForm ? <SignUpCard /> : <LoginCard />} */}

      {openAuthLoginModal && (<Modals>
        <AuthModal setOpenAuthLoginModal={setOpenAuthLoginModal} />
      </Modals>)}
    </div>
  );
}

export default App;
