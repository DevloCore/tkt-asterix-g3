import React, { useEffect } from 'react';

const Navbar = (vars) => {
  const router = vars.router;
  const routes = router.routes;
  const currentRoute = router.state.location.pathname;

  return (
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Menu</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            {routes.map((route, index) => (
              <li className="nav-item" key={index} style={{ cursor: 'pointer' }}>
                <span className={`nav-link ${route.path == currentRoute ? 'active' : ''}`} onClick={() => router.navigate(route.path)}>{route.name}</span>
              </li>
            ))}
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Lieux
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/menu">Attractions</a></li>
                <li><a class="dropdown-item" href="/menu">Commerce</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/missions">Missions</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/avertissements">Avertissements</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/admin">Panel Admin</a>
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