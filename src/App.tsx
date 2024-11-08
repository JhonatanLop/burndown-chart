import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chart from './pages/Chart';
import Svg from './pages/Svg';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chart />} />
        <Route path="/svg" element={<Svg />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
