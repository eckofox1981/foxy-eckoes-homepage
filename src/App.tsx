import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/app.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { EventPage } from "./pages/Event";
import { AccountPage } from "./pages/Account";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
