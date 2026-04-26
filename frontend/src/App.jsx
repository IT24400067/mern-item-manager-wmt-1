import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "https://mern-item-manager-wmt-1-production-e554.up.railway.app";

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const fetchItems = async () => {
    const res = await fetch(`${API_URL}/api/items`);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const newItem = await res.json();
    setItems([newItem, ...items]);

    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
    });
  };

const deleteItem = async (id) => {
  await fetch(`${API_URL}/api/items/${id}`, {
    method: "DELETE",
  });
  setItems(items.filter((item) => item._id !== id));
};

  return (
    <div className="container">
      <h1>MERN Item Manager</h1>

      <form onSubmit={handleSubmit} className="form-card">
        <input
          type="text"
          name="name"
          placeholder="Item name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          > 
            <option value= "">Select Category</option>
            <option value="Electronic Items">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Food">Food</option>
            <option value="Books">Books</option>
            <option value="Other">Other</option>
        </select>

        <button type="submit">Add Item</button>
      </form>

      <div className="item-list">
        {items.map((item) => (
          <div className="item-card" key={item._id}>
            <h2>{item.name}</h2>
            <p>Price: Rs. {item.price}</p>
            <p>Description: {item.description}</p>
            <p>Caategory: {item.category}</p>
            
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
