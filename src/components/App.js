import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  const addToy = (newToy) => {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((addedToy) => setToys((prevToys) => [...prevToys, addedToy]));
  };

  const deleteToy = (id) => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() =>
      setToys((prevToys) => prevToys.filter((toy) => toy.id !== id))
    );
  };

  const likeToy = (id, likes) => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        setToys((prevToys) =>
          prevToys.map((toy) => (toy.id === id ? updatedToy : toy))
        );
      });
  };

  const handleClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} deleteToy={deleteToy} likeToy={likeToy} />
    </>
  );
}

export default App;
