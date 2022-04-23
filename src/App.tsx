import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
// import Public from './pages/public';
import Private from './pages/private';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* <Route path="/*" element={<Public />} /> */}
        <Route path="/*" element={<Private />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
