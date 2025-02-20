import { Box, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";
import { useEffect, useState } from "react";

function SplitView() {
    const [setLoading, loading] = useState(true)
    const [setLoans, loans] = useState(null)

    

  return (
    <Paper sx={{ width: 600, height: 400, display: "flex", mx: "auto", mt: 5, overflow: "hidden" }}>
      {/* Left Section - Loan Selector */}
      <Box
        sx={{
          width: "30%",
          bgcolor: "grey.200",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
                <Typography variant="h6" gutterBottom>
          Menu
        </Typography>
        <Typography>test</Typography>
      </Box>

      {/* Right Section - Content */}
      <Box sx={{ width: "70%", p: 3 }}>
        <Typography>Loan Info</Typography>
      </Box>
    </Paper>
  );
}

export default SplitView;
