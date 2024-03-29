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
    <nav class="navbar navbar-expand-lg mb-4 shadow">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Parc Asterix</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Lieux
              </a>
              <ul class="dropdown-menu">
                <li><span className={`dropdown-item ${isActive('/menu')}`} onClick={() => navigate("/menu")}>Attractions</span></li>
                {/* <li><span className={`dropdown-item ${isActive('/menu')}`} onClick={() => navigate("/menu")}>Commerces</span></li> */}
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <span className={`nav-link ${isActive('/missions')}`} onClick={() => navigate("/missions")}>Missions</span>
            </li>
            <li className="nav-item">
              <span className={`nav-link ${isActive('/avertissements')}`} onClick={() => navigate("/avertissements")}>Avertissements</span>
            </li>
            <li className="nav-item">
              <span className={`nav-link ${isActive('/admin')}`} onClick={() => navigate("/admin")}>Panel Admin</span>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;