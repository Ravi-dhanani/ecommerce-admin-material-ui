import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

const DashboardCard = [
  {
    Name: "Category",
    Icon: <CategoryIcon style={{ height: "25px", width: "25px" }} />,
    Route: "/category",
  },
  {
    Name: "Products",
    Icon: (
      <ShoppingCartCheckoutIcon style={{ height: "25px", width: "25px" }} />
    ),
    Route: "/products",
  },
  {
    Name: "Products",
    Icon: (
      <ShoppingCartCheckoutIcon style={{ height: "25px", width: "25px" }} />
    ),
    Route: "/products",
  },
  {
    Name: "Products",
    Icon: (
      <ShoppingCartCheckoutIcon style={{ height: "25px", width: "25px" }} />
    ),
    Route: "/products",
  },
];
export default function Dashboard() {
  return (
    <div>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {DashboardCard.map((item: any, index: number) => (
          <Grid item xs={2} sm={3} md={3} key={index}>
            <Card
              sx={{ maxWidth: 350 }}
              style={{ cursor: "pointer", backgroundColor: "#095192" }}
            >
              <CardContent>
                <IconButton sx={{ color: "white" }}>{item.Icon}</IconButton>
                <Typography variant="h5" color="white" fontWeight={600}>
                  {item.Name}
                </Typography>
                <Typography variant="subtitle1" color="white">
                  {item.Name}
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
