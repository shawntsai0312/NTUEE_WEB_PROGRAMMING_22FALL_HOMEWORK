import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mainpage from './containers/mainPage';
import NavBar from './components/navigationBar';
import MenuList from './components/menuList';
import LogInPage from './containers/logInPage';
import SignUpPage from './containers/signUpPage';
import NewAdditionPage from './containers/newAdditionPage';
import CollectionPage from './containers/collectionPage';
import MerchandisePage from './containers/merchandisePage';
import FollowingPage from './containers/followingPage';
import OthersCollectionPage from './containers/othersCollectionPage';
import OthersMerchandisePage from './containers/othersMerchandisePage';

function App() {
  return (
    <Router>
      <NavBar />
      <div className='main'>
        <div className='menuBar'>
          <MenuList />
        </div>
        <div className='Page'>
          <Routes>
            <Route path='/' element={<Mainpage />} />
            <Route path='/logIn' element={<LogInPage />} />
            <Route path='/signUp' element={<SignUpPage />} />
            <Route path='/newAdditionPage' element={<NewAdditionPage />} />
            <Route path='/collectionPage' element={<CollectionPage />} />
            <Route path='/followingPage' element={<FollowingPage />} />
            <Route path='/merchandisePage' element={<MerchandisePage />} />
            <Route path='/othersCollectionPage' element={<OthersCollectionPage />} />
            <Route path='/othersMerchandisePage' element={<OthersMerchandisePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
