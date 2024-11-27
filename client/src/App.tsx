import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Home() {

  console.log('VITE_GIT_COMMIT_HASH', import.meta.env.VITE_GIT_COMMIT_HASH);

  const handleClick = async () => {
    const response = await fetch('/api/');
    console.log('==================');
    console.log('response', await response.json());
    console.log('==================');
  }

  return (
    <div>
      <h1>Home Page CI-3</h1>
      <p>Welcome to the Home Page!</p>
      <button onClick={handleClick}>fetch</button>
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
  const handleClick = async () => {
    const response = await fetch('/api/');
    console.log('==================');
    console.log('response', await response.json());
    console.log('==================');
  }
  return (
    <div>
      <h1>Contact Page</h1>
      <p>Feel free to reach out to us here!</p>
      <button onClick={handleClick}>fetch</button>
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
