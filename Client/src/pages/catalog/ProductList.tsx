import { Grid } from "@mui/material";
import type { IProduct } from "../../model/IProduct";
import Product from "./Product";

interface Props {
  products: IProduct[];
}

export default function ProductList(props: Props) {
  return (
    <Grid container spacing={2}>
      {props.products.map((p: IProduct) => (
        <Grid key={p.id} size={{ xs: 6, md: 4, lg: 3 }}>
          <Product key={p.id} product={p} />
        </Grid>
      ))}
    </Grid>
  );
}
