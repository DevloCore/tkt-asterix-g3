import React, { useEffect } from 'react';

const Navbar = (vars) => {
  const router = vars.router;
  const routes = router.routes;
  const currentRoute = router.state.location.pathname;

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Menu</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {routes.map((route, index) => (
              <li className="nav-item" key={index} style={{ cursor: 'pointer' }}>
                <span className={`nav-link ${route.path == currentRoute ? 'active' : ''}`} onClick={() => router.navigate(route.path)}>{route.name}</span>
              </li>
            ))}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Lieux
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/menu">Attractions</a></li>
                <li><a className="dropdown-item" href="/menu">Commerce</a></li>
                {/* <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li> */}
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/missions">Missions</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/avertissements">Avertissements</a>
            </li>
          </ul>
          {/* Panel Administrateur */}
          <ul className="navbar-nav ml-auto"> {/* Utilisation de ml-auto pour décaler vers la droite */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Panel Administrateur
              </a>
              <ul className="dropdown-menu dropdown-menu-end"> {/* Utilisation de dropdown-menu-end pour placer le menu à droite */}
                <li><a className="dropdown-item" href="/gestionstaff">Personnels</a></li>
                <li><a className="dropdown-item" href="/menu">Missions</a></li>
                <li><a className="dropdown-item" href="/menu">Avertissements</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
