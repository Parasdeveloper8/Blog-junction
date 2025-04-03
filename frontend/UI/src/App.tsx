import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/notFound.tsx";
import Home from "./components/home.tsx";
import CreatePage from "./components/create.tsx";
import Login   from "./components/authComponents/login.tsx";
import Register from "./components/authComponents/register.tsx";
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} /> {/*Render Home Page */}
        <Route path="/createPage" element = {<CreatePage/>}/> {/* Render create post page */}
        <Route path="*" element={<NotFound />} /> {/* Render not found page if route not found */}
        <Route path="/login" element={<Login/>} /> {/*Render Login Page */}
        <Route path="/register" element={<Register/>} /> {/*Render Register Page */}
      </Routes>
    </Router>
    </>
  )
}

export default App
