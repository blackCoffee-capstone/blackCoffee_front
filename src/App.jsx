// router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './component/common/Header'
import Footer from './component/common/Footer'

import Home from './page/Home'
import About from './page/About'
import Customer from './page/Customer'
import NotFound from './page/NotFound'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;