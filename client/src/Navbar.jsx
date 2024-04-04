import React, { useEffect, useState } from 'react';
import './assets/navbar.css';

const Navbar = (vars) => {
  const router = vars.router;

  const [active, setActive] = useState("/");

  useEffect(() => {
    setActive(router.state.location.pathname);
  });

  function isActive(path) {
    return active === path ? 'active' : '';
  }

  function navigate(path) {
    router.navigate(path);
    setActive(path);
  }

  return (
    <nav className="navbar navbar-expand-lg mb-4 shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Parc Asterix</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Lieux
              </a>
              <ul className="dropdown-menu">
                <li><span className={`dropdown-item ${isActive('/attractions')}`} onClick={() => navigate("/attractions")}>Attractions</span></li>
                {/* <li><span className={`dropdown-item ${isActive('/menu')}`} onClick={() => navigate("/menu")}>Commerces</span></li> */}
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <span className={`nav-link ${isActive('/missions')}`} onClick={() => navigate("/missions")}>Missions</span>
            </li>
            <li className="nav-item">
              <span className={`nav-link ${isActive('/avertissements')}`} onClick={() => navigate("/avertissements")}>Avertissements</span>
            </li>
            <li className="nav-item">
              <span className={`nav-link ${isActive('/gestionstaff')}`} onClick={() => navigate("/gestionstaff")}>Panel Admin</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
