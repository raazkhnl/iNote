import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <>
			<Router>
				<Navbar/>
        <Home/>
				{/* <LoadingBar color="#f11946" progress={progress} /> */}
				<Routes>
					{/* <Route exact path="/"  /> */}
					<Route exact path="/about" element={ <About /> } />
				</Routes>
			</Router>
		</>
  );
}

export default App;
