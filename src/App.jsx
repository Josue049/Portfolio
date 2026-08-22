import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Work from "./pages/work";
import About from "./pages/about";
import Contact from "./pages/contact";
import CaseStudy from "./pages/caseStudy";

export default function App(){return <BrowserRouter><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/work" element={<Work/>}/><Route path="/work/:slug" element={<CaseStudy/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<Home/>}/></Routes></BrowserRouter>}
