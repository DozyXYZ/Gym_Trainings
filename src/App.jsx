import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CssBaseline, Button } from "@mui/material";


function App() {

  return (
    <>
      <Container maxWidth="xxl">

        <AppBar position="static" style={{ marginBottom: "20px" }}>
          <Toolbar>
            <Typography variant="h6">
              Crimson Training
            </Typography>
          </Toolbar>
        </AppBar>

        <nav>
          <Button><Link to="/">Customers</Link></Button>
          <Button><Link to="/trainings">Trainings</Link></Button>
        </nav>

        <Outlet />

        <CssBaseline />

      </Container>
    </>
  )
}

export default App
