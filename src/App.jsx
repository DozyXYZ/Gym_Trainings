import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CssBaseline, Button } from "@mui/material";

function App() {

  return (
    <>
      <Container maxWidth="xxl">

        <AppBar position="static" style={{ marginBottom: "20px" }}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGlow: 1 }}>
              Crimson Training
            </Typography>

            <nav style={{ marginLeft: 'auto' }}>
              <Button color="inherit">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Customers</Link>
              </Button>

              <Button color="inherit">
                <Link to="/trainings" style={{ textDecoration: 'none', color: 'inherit' }}>Trainings</Link>
              </Button>

              <Button color="inherit">
                <Link to="/trainingscalendar" style={{ textDecoration: 'none', color: 'inherit' }}>Calendar</Link>
              </Button>

              <Button color="inherit">
                <Link to="/trainingstats" style={{ textDecoration: 'none', color: 'inherit' }}>Statistics</Link>
              </Button>
            </nav>
          </Toolbar>
        </AppBar>

        <Outlet />

        <CssBaseline />

      </Container>
    </>
  )
}

export default App
