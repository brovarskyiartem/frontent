import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Прибрати BrowserRouter
import MainPage from './pages/mainpage/mainpage.jsx';
import LoginPage from "./pages/login/login.jsx";
import AreaPage from "./pages/area/area.jsx"
import ComentsPage from './pages/coments/coments.jsx'
import WeatherPage from "./pages/waether/weather";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
          <Route path='/area' element={<AreaPage/>} />
          <Route path='/coments' element={<ComentsPage/>} />
          <Route path='/weather' element={<WeatherPage/>} />
      </Routes>
    </div>
  );
}

export default App;