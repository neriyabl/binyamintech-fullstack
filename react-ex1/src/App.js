import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Item from "./components/Item/Item";

const mockItems = [
  { id: 1, name: "aaa", age: 10 },
  { id: 2, name: "bbb", age: 20 },
  { id: 3, name: "ccc", age: 30 },
];

function App() {
  const [items, setItems] = useState(mockItems);
  const [cart, setCart] = useState([]);

  const addItem = () => {
    const name = prompt("add new name");
    const age = +prompt("add new age");
    setItems([...items, { name, age }]);
  };

  /*
  [
    {     
      id: 1,
      name:"aaa",
      age: 12,
      count: 2
    }
  ]
  */

  const addToCart = (item) => {
    if (cart.find((i) => i.id === item.id)) {
      setCart(
        cart.map((i) => (i.id === item.id ? { ...i, count: i.count + 1 } : i))
      );
    } else {
      setCart([...cart, { ...item, count: 1 }]);
    }
  };

  return (
    <div className="App">
      <div className="items">
        {items.map((item) => (
          <Item item={item} onItemClicked={addToCart} key={item.id} />
        ))}
      </div>
      <div>
        --------------------------------------------------------------------------------------------------------------------------------------
      </div>
      <div className="items">
        {cart.map((item) => (
          <div key={item.id}>
            <Item item={item} key={item.id} />
            <h3>in cart: {item.count}</h3>
          </div>
        ))}
      </div>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default App;
