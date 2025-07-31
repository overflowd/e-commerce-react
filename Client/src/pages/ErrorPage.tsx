import {
  Alert,
  AlertTitle,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import requests from "../api/requests";
import { useState } from "react";

export default function ErrorPage() {
  const [valitadionErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationErrors() {
    requests.errors
      .getValidationError()
      .then(() => console.log("No validation errors"))
      .catch((errors) => setValidationErrors(errors));
  }
  return (
    <Container>
      {valitadionErrors.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {valitadionErrors.map((error, index) => (
              <ListItem key={index}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        onClick={() =>
          requests.errors.get400Error().catch((err) => console.log(err))
        }
      >
        400 Error
      </Button>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        onClick={() =>
          requests.errors.get401Error().catch((err) => console.log(err))
        }
      >
        401 Error
      </Button>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        onClick={() =>
          requests.errors.get404Error().catch((err) => console.log(err))
        }
      >
        404 Error
      </Button>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        onClick={() =>
          requests.errors.get500Error().catch((err) => console.log(err))
        }
      >
        500 Error
      </Button>
      <Button sx={{ mr: 2 }} variant="contained" onClick={getValidationErrors}>
        Valitadion Error
      </Button>
    </Container>
  );
}
