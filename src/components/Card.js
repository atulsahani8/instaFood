import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducers";

const Card = (props) => {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  const options = props.options;
  const optionKeys = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(optionKeys[0]);


  // const handleAddToCart = async () => {
  //   let food = [];
  //   for (const item of data)
  //     if (item.id === props.fooditem._id) {
  //       food = item;
  //       break;
  //     }

  //   if (food !== []) {
  //     if (food.size === size) {
  //       await dispatch({
  //         type: "UPDATE",
  //         id: props.fooditem._id,
  //         price: finalPrice,
  //         qty: qty,
  //       });
  //       return;
  //     }
  //   } else if (food.size !== size) {
  //     await dispatch({
  //       type: "ADD",
  //       id: props.fooditem._id,
  //       name: props.fooditem.name,
  //       price: finalPrice,
  //       qty: qty,
  //       size: size,
  //       img: props.ImgSrc,
  //     });
  //     return;
  //   } else {
  //     await dispatch({
  //       type: "ADD",
  //       id: props.fooditem._id,
  //       name: props.fooditem.name,
  //       qty: qty,
  //       size: size,
  //       price: props.finalPrice,
  //       img: props.fooditem.img,
  //     });
  //     return;
  //   }
  // };

  const handleAddToCart = async () => {
    let food = data.find((item) => item.id === props.fooditem._id);
  
    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.fooditem._id,
          price: finalPrice, // Use finalPrice here
          qty: qty,
        });
      } else {
        await dispatch({
          type: "ADD",
          id: props.fooditem._id,
          name: props.fooditem.name,
          price: finalPrice, // Use finalPrice here
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
      }
    } else {
      await dispatch({
        type: "ADD",
        id: props.fooditem._id,
        name: props.fooditem.name,
        qty: qty,
        size: size,
        price: finalPrice, // Use finalPrice here
        img: props.fooditem.img,
      });
    }
  };
  
  

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            src={props.fooditem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "200px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.fooditem.name}</h5>
            <div className="container w-100">
              <select
                className="m-2 h-100 bg-success rounded"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select
                className="m-2 h-100 bg-success rounded"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {optionKeys.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>

              <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            </div>
          </div>

          <button
            className="btn btn-success justify-center mx-auto mb-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
