import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Binding from "./pages/binding";
import Transfer from "./pages/transfer";
import TransferNative from "./pages/transfer-native";

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-screen gradient-bg-welcome">
        <Header />
        <Routes>
          <Route path='/' element={<Binding />} />
          <Route path='/transfer' element={<Transfer />} />
          <Route path='/transfer-native' element={<TransferNative />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}