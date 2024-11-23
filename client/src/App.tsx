import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page!</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the About Page where you can learn more about us.</p>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h1>Contact Page</h1>
      <p>Feel free to reach out to us here!</p>
    </div>
  );
}

function App() {

  return (
    <Router>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
