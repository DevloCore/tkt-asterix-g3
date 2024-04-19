import React, { useContext, useEffect, useState } from 'react';
import './assets/navbar.css';
import { UserContext } from './assets/contexts/UserContext';
import Icon from '@mdi/react';
import { mdiShieldCrown } from '@mdi/js';

const Navbar = ({ router }) => {
  const { user } = useContext(UserContext);
  const [active, setActive] = useState("/");

  useEffect(() => {
    setActive(router.state.location.pathname);
  }, [router.state.location.pathname]);

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
        <a className="navbar-brand" href="/">
          <img src="/src/assets/logoparcasterix.png" alt="Logo Parc Asterix" style={{ height: '40px' }} />
        </a>
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
                <li><span className={`dropdown-item ${isActive('/boutiques')}`} onClick={() => navigate("/boutiques")}>Boutiques</span></li>
              </ul>
            </li>
            {user && (
              <li className="nav-item">
                <span className={`nav-link ${isActive('/missions')}`} onClick={() => navigate("/missions")}>Missions</span>
              </li>
            )}
            <li className="nav-item">
              <span className={`nav-link ${isActive('/avertissements')}`} onClick={() => navigate("/avertissements")}>Avertissements</span>
            </li>
            <li className="nav-item">
                <span className={`nav-link ${isActive('/billetterie')}`} onClick={() => navigate("/billetterie")}>Billetterie</span>
              </li>
            {user && user.admin === 1 && (
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
            {user && user.metier === 5 && (
              <li className="nav-item">
                <span className={`nav-link ${isActive('/gestionboutiques')}`} onClick={() => navigate("/gestionboutiques")}>Gestion Boutiques</span>
              </li>
            )}
            {user && user.metier === 3 && (
              <li className="nav-item">
                <span className={`nav-link ${isActive('/gestionbilleterie')}`} onClick={() => navigate("/gestionbilleterie")}>Gestion Billetterie</span>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
          
            {!user && (
              <li className="nav-item">
                <button className={`btn btn-success ${isActive('/login')}`} onClick={() => navigate("/login")}>Connexion</button>
              </li>
            )}
            
            {user && (
              <li className="nav-item">
                {user.admin===1 &&(<Icon path={mdiShieldCrown} size={1} className='me-1'/>)}<span className='fw-bold me-3'>{user.email}</span>
                <button className="btn btn-danger" onClick={() => {
                  localStorage.removeItem("apiToken");
                  localStorage.removeItem("user");
                  window.location = '/';
                }}>Se Déconnecter</button>
              </li>
            )}
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
