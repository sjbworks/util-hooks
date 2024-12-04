import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { NavigateGuard, Home } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nav-guard" element={<NavigateGuard />} />
      </Routes>
    </BrowserRouter>
  );
}
