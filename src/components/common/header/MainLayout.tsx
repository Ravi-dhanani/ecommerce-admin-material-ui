import { Box } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout(props: { children: any }) {
  const [open, setOpen] = React.useState(true);
  return (
    <div>
      <Navbar open={open} setOpen={setOpen} />
      <Box sx={{ display: "flex" }}>
        <Sidebar open={open} />
        <Box component="main" sx={{ flexGrow: 1, pt: 10, pl: 2, pr: 2 }}>
          {props.children}
        </Box>
      </Box>
    </div>
  );
}
