import './App.css';
import Tasks from './components/Tasks';
/* import Users from './components/Users'; */
/* import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' */

function App() {
  return (
    <main>
      {/* <Router>
        <Routes>
          <Route path='/' element={<Users/>}/>
          <Route path='/task' element={<Tasks/>}/>
        </Routes>
      </Router> */}
      <Tasks/>
    </main>
  );
}

export default App;