import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import type { IProduct } from "../../model/IProduct";
import { AddShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router";
import { useState } from "react";
import requests from "../../api/requests";
import { LoadingButton } from "@mui/lab";
import { useCartContext } from "../../context/CartContext";

interface Props {
  product: IProduct;
}

export default function Product(props: Props) {
  const [loading, setLoading] = useState(false);

  const { setCart } = useCartContext();

  function handleAddItem(productId: number) {
    setLoading(true);

    requests.cart
      .addItem(productId)
      .then((cart) => setCart(cart))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  return (
    <Card>
      <CardMedia
        sx={{ height: 160, backgroundSize: "contain" }}
        image={`http://localhost:5263/images/${props.product.imageUrl}`}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          color="text-secondary"
        >
          {props.product.name}
        </Typography>
        <Typography variant="body2" color="secondary">
          {(props.product.price / 100).toFixed(2)} TL
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          startIcon={<AddShoppingCart />}
          variant="outlined"
          size="small"
          loadingPosition="start"
          loading={loading}
          onClick={() => handleAddItem(props.product.id)}
        >
          Add to cart
        </LoadingButton>
        <Button
          component={Link}
          to={`/catalog/${props.product.id}`}
          variant="outlined"
          size="small"
          startIcon={<SearchIcon />}
          color="primary"
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
