import React, { useContext, useEffect, useState } from 'react';
import './assets/navbar.css';
import { UserContext } from './assets/contexts/UserContext';

const Navbar = (vars) => {
  const router = vars.router;

  const [active, setActive] = useState("/");

  const userCon = useContext(UserContext);

  useEffect(() => {
    setActive(router.state.location.pathname);
  }, [router.state.location.pathname]); // Ajoutez les dépendances de useEffect

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
                <li><hr className="dropdown-divider" /></li>
                <li><a className={`dropdown-item ${isActive('/boutiques')}`} onClick={() => navigate("/boutiques")}>Boutiques</a></li>
              </ul>
            </li>
            {userCon.user && (
            <li className="nav-item">
              <span className={`nav-link ${isActive('/missions')}`} onClick={() => navigate("/missions")}>Missions</span>
            </li>
            )}
            <li className="nav-item">
              <span className={`nav-link ${isActive('/avertissements')}`} onClick={() => navigate("/avertissements")}>Avertissements</span>
            </li>


            {userCon.user && userCon.user.admin === 1 && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Panel Admin
                </a>
                <ul className="dropdown-menu">
                  <li><span className={`dropdown-item ${isActive('/gestionstaff')}`} onClick={() => navigate("/gestionstaff")}>Gestion Personnel</span></li>
                  <li><span className={`dropdown-item ${isActive('/gestionmissions')}`} onClick={() => navigate("/gestionmissions")}>Gestion Missions</span></li>
                  <li><span className={`dropdown-item ${isActive('/gestionalerts')}`} onClick={() => navigate("/gestionalerts")}>Gestion Avertissements</span></li>
                </ul>
              </li>
            )}
            {userCon.user && userCon.user.metier === 5 && (
              <li className="nav-item">
              <span className={`nav-link ${isActive('/gestionboutiques')}`} onClick={() => navigate("/gestionboutiques")}>Gestion Boutiques</span>
            </li>
            )}
            {!userCon.user && (
              <li className="nav-item">
              <span className={`nav-link ${isActive('/login')} text-success`} onClick={() => navigate("/login")}>Connexion</span>
            </li>
            )}
            {userCon.user && (
              <li className="nav-item">
              <span className={`nav-link text-danger`} onClick={() => {
                localStorage.removeItem("apiToken");
                localStorage.removeItem("user");
                window.location = '/';
            }}>Se Déconnecter</span>
            </li>
            )}
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;