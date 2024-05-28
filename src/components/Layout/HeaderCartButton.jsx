import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/Cart-context";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnAnimtion, setBtnAnimtion] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnAnimtion ? classes.bump : ""}`;
  useEffect(() => {
    if (items.lenght === 0) {
      return;
    }
    setBtnAnimtion(true);
    const timer = setTimeout(() => {
      setBtnAnimtion(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <>
      <button onClick={props.onClick} className={btnClasses}>
        <span className={classes.icon}>
          <AddShoppingCartIcon />
        </span>

        <span>Your Cart</span>

        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    </>
  );
};

export default HeaderCartButton;
