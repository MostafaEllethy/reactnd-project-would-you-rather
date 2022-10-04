import Header from "../features/header/Header";
import { Fragment } from "react";
import { Grid, Card } from "@mui/material";

const MainLayout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Card variant="outline" sx={{ border: 1, borderColor: "divider" }}>
            {children}
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default MainLayout;
