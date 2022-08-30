import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { user } = useAuth0();
  if(!user) return (<p>Log in to see your trips!!</p>)
  return (
    <div>
      <Typography variant="h1">Home</Typography>
      <div>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="194"
              image="https://cdn.djaunter.com/wp-content/uploads/2020/05/montivagant-backpacker.jpg"
              alt="Back Packer"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Your custom settings
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button
                sx={{
                  my: 2,
                  "&:hover": {
                    color: "white",
                  },
                }}
                component={Link}
                to="/profile"
                primary="true"
                variant="contained"
              >
                Profile
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="194"
              image="https://media.cntraveller.com/photos/615b0b3c418472e411c3d2c3/16:9/w_2580,c_limit/Best%20Countries%20grid.jpg"
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Your list of trips
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button
                sx={{
                  my: 2,
                  "&:hover": {
                    color: "white",
                  },
                }}
                component={Link}
                to="/trips"
                primary="true"
                variant="contained"
              >
                Trips
              </Button>
            </CardActions>
          </Card>
        </Stack>
      </div>
    </div>
  );
}

export default Home;
