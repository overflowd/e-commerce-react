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

interface Props {
  product: IProduct;
}

export default function Product(props: Props) {
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
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddShoppingCart />}
          color="success"
        >
          Add to cart
        </Button>
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
