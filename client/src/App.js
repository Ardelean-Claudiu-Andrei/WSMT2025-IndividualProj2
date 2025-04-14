import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", stock: "" });
  const API = "http://localhost:3000/items";

  const fetchItems = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      // verificăm dacă am primit o listă validă
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        console.error("Invalid response format:", data);
        setItems([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setItems([]);
    }
  };

  const addItem = async () => {
    const { name, price, stock } = newItem;
    if (
      !name.trim() ||
      isNaN(price) ||
      price < 0 ||
      isNaN(stock) ||
      stock < 0
    ) {
      alert("All fields must be valid. Price and stock must be non-negative.");
      return;
    }

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
      }),
    });
    setNewItem({ name: "", price: "", stock: "" });
    console.log("Sending:", { name, price, stock });
    fetchItems();
  };

  const updateItem = async (id) => {
    const item = items.find((i) => i.id === id);
    const name = prompt("New name:", item.name);
    const price = parseFloat(prompt("New price:", item.price));
    const stock = parseInt(prompt("New stock:", item.stock));

    if (
      !name.trim() ||
      isNaN(price) ||
      price < 0 ||
      isNaN(stock) ||
      stock < 0
    ) {
      alert("All updated fields must be valid.");
      return;
    }

    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, stock }),
    });
    fetchItems();
  };

  const deleteItem = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <button
        className="download-button"
        onClick={() => {
          const blob = new Blob([JSON.stringify(items, null, 2)], {
            type: "application/json",
          });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "items.json";
          link.click();
        }}
      >
        Download JSON
      </button>

      <h1>CRUD App</h1>

      <input
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        placeholder="Product name"
      />
      <input
        type="number"
        value={newItem.price}
        onChange={(e) =>
          setNewItem({ ...newItem, price: Number(e.target.value) })
        }
        placeholder="Price"
      />

      <input
        type="number"
        value={newItem.stock}
        onChange={(e) =>
          setNewItem({ ...newItem, stock: Number(e.target.value) })
        }
        placeholder="Stock"
      />

      <button className="add-button" onClick={addItem}>
        Add
      </button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>
              <strong>{item.name}</strong> - ${item.price} | Stock: {item.stock}
            </span>

            <div>
              <button
                className="edit-button"
                onClick={() => updateItem(item.id)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
