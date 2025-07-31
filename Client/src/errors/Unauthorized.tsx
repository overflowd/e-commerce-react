import { Button, Card, Container, Divider, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router";

export default function Unauthorized() {
  const { state } = useLocation();
  return (
    <Container component={Card} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {state.error.title || "Unauthorized"} - {state.status}
      </Typography>
      <Divider />
      <Button
        variant="contained"
        component={NavLink}
        to="/catalog"
        sx={{ mt: 3 }}
      >
        Continue Shopping
      </Button>
    </Container>
  );
}
