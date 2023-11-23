import logo from './logo.svg';
import './App.css';

import Header from './component/Header';
import NewForm from './component/NewForm';
import Data from './component/Data';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div >
      <Header/>
      <Routes>
      <Route path="/" exact element={<NewForm />} />
      <Route path="/data" exact element={<Data />} />

      </Routes>
     
      
    </div>
  );
}

export default App;
