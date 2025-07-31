import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { IProduct } from "../../model/IProduct";
import requests from "../../api/requests";
import NotFound from "../../errors/NotFound";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requests.catalog
      .details(Number(id))
      .then((data) => setProduct(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Typography variant="h6">Loading...</Typography>;

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xl: 3, lg: 4, md: 5, sm: 6, xs: 12 }}>
        <img
          src={`http://localhost:5263/images/${product.imageUrl}`}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid size={{ xl: 9, lg: 8, md: 7, sm: 6, xs: 12 }}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {(product.price / 100).toFixed(2)} TL
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
