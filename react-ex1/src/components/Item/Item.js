//{ name: "aaa", age: 10 },

import React from "react";
import "./Item.css";

const Item = ({ item, onItemClicked }) => {
  return (
    <div className="item" onClick={() => onItemClicked && onItemClicked(item)}>
      <h1>Name: {item.name}</h1>
      <h2>Age: {item.age}</h2>
    </div>
  );
};

export default Item;
