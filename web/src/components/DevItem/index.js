import React from 'react';
import api from '../../services/api'


import './styles.css';

function DevItem({ dev }) {
  function handleDelete() {
    api.delete(`/devs/${dev.github_username}`);
    window.location.reload();
  }
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name}/>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
        <div className="editUpdate-user">
          <button 
            onClick={function () {
              handleDelete()
            }} 
            type="button">Remover</button>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`} target="_blank" rel="noopener noreferrer">Acessar perfil no Github</a>
    </li>
  );
}

export default DevItem;