import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Dashboard } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./app/router/ProtectedRouter";
import { mainListItems, secondaryListItems } from "./listItems";
import { RootState } from "./app/store/rootReducer";
import MenuBar from "./app/layout/MenuBar";
import MenuDrawer from "./app/layout/MenuDrawer";
import Footer from "./app/layout/Footer";
import Signin from "./features/auth/SignIn";
import Signup from "./features/auth/SignUp";
import ProjectNew from "./features/projects/ProjectNew";

const mdTheme = createTheme();

const App = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.security.isAuthenticated
  );

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Router>
        <ThemeProvider theme={mdTheme}>
          {isAuthenticated ? (
            <Box sx={{ display: "flex" }}>
              <CssBaseline />

              {/* Pass toggleDrawer to MenuBar */}
              <MenuBar open={open} toggleDrawer={toggleDrawer} />

              <MenuDrawer
                open={open}
                toggleDrawer={toggleDrawer}
                mainListItems={mainListItems}
                secondaryListItems={secondaryListItems}
              />

              <Box
                component="main"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
                  flexGrow: 1,
                  height: "100vh",
                  overflow: "auto",
                }}
              >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                      <Routes>
                        <Route
                          path="/"
                          element={
                            <ProtectedRoute>
                              <Dashboard/>
                            </ProtectedRoute>
                          }
                        />
                         <Route
                          path="/projectnew"
                          element={
                            <ProtectedRoute>
                              <ProjectNew/>
                            </ProtectedRoute>
                          }
                        />
                      </Routes>

                      <Footer />
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Box>
          ) : (
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={24} md={16} lg={19}>
                    <Routes>
                      <Route path="/" element={<Signin />} />
                      <Route path="/signin" element={<Signin />} />
                      <Route path="/signup" element={<Signup />} />
                    </Routes>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          )}
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
