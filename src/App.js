// import logo from './public/ressource/image/logo.png';
import './App.css';
import { Suspense } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import Index from './Component/Index';
// import Login from './Component/Login';
// import Register from './Component/Register';
//  import Profile from './Component/Profile';
// import Mesblogs from './Component/Mesblogs';
// import Newblog from './Component/Newblog.';
// import Categories from './Component/Categories';
// import Enattente from './Component/Enattente';
// import Edite from './Component/Edite';
// import Lecture from './Component/Lecture';
import { Routing } from './Component/Routing';





function App() {
  return (
    <Router >
        <Suspense fallback={<div className={"chargement"}>Loading...</div> }>
        <Routes>
          {Object.values(Routing).map((route) => (
            <Route key={route.name} path={route.path} element={<route.element />} />
          ))}
        </Routes>
        </Suspense>
    </Router>
  );
}

export default App;
