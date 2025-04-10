import Footer from "./footer"
import Header from "./header"
import Main from "./main"
import { useEffect } from "react"
const Home = () =>{
    useEffect(()=>{
       document.title = "Home";
    });
    return (
        <>
        <Header/>
        <Main/>
        <Footer/>
        </>
    )
}
export default Home