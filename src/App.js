import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get("repositories").then((reponse) => {
      setRepository(reponse.data);
    });
  }, []);
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Rafa",
      url: "https://github.com/rafaelmoz/desafio-conceitos-node",
      techs: ["Node.js", "ReactJs", "React Native"],
    });

    setRepository([...repository, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepository(repository.filter((repositorio) => repositorio.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map((repositorio) => (
          <li key={repositorio.id}>
            {repositorio.title}

            <button onClick={() => handleRemoveRepository(repositorio.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
