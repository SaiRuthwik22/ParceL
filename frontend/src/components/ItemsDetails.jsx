import React from "react";
import ItemContext from "../ItemContext";
import { useContext } from "react";


function ItemsDetails() {
  const {id}=useContext(ItemContext)
  return (
    <>
      <h1>{id[0]}</h1>
      <img src={id[2]} alt="" />
      <h3>{id[1]}</h3>
      <button>add to cart</button>
    </>
  );
}

export default ItemsDetails;
