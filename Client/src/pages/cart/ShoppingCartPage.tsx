import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  AddCircleOutline,
  Delete,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import requests from "../../api/requests";

export default function ShoppingCartPage() {
  const { cart, setCart } = useCartContext();
  const [status, setStatus] = useState({ loading: false, id: "" });

  function handleAddItem(productId: number, id: string) {
    setStatus({ loading: true, id: id });

    requests.cart
      .addItem(productId)
      .then((cart) => setCart(cart))
      .catch((error) => console.error(error))
      .finally(() => setStatus({ loading: false, id: "" }));
  }

  function handleDeleteItem(productId: number, id: string, quantity = 1) {
    setStatus({ loading: true, id: id });

    requests.cart
      .deleteItem(productId, quantity)
      .then((cart) => setCart(cart))
      .catch((error) => console.error(error))
      .finally(() => setStatus({ loading: false, id: "" }));
  }

  if (cart?.cartItems.length === 0)
    return <Alert severity="warning">No products in cart.</Alert>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.cartItems.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img
                  src={`http://localhost:5263/images/${item.imageUrl}`}
                  alt=""
                  style={{ height: 60 }}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">
                <LoadingButton
                  loading={
                    status.loading && status.id === "add-" + item.productId
                  }
                  onClick={() => {
                    handleAddItem(item.productId, "add-" + item.productId);
                  }}
                >
                  <AddCircleOutline />
                </LoadingButton>
                {item.quantity}
                <LoadingButton
                  loading={
                    status.loading && status.id === "delete-" + item.productId
                  }
                  onClick={() => {
                    handleDeleteItem(
                      item.productId,
                      "delete-" + item.productId
                    );
                  }}
                >
                  <RemoveCircleOutline />
                </LoadingButton>
              </TableCell>
              <TableCell align="right">
                {item.price * item.quantity} TL
              </TableCell>
              <TableCell align="right">
                <LoadingButton
                  color="error"
                  loading={
                    status.loading &&
                    status.id === "delete-all-" + item.productId
                  }
                  onClick={() => {
                    handleDeleteItem(
                      item.productId,
                      "delete-all-" + item.productId,
                      item.quantity
                    );
                  }}
                >
                  <Delete />
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell align="right">All Total Price:</TableCell>
            <TableCell colSpan={4} align="right">
              {cart?.cartItems
                .map((item) => item.price * item.quantity)
                .reduce((a, b) => a + b, 0)}{" "}
              TL
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
