import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Header from "./components/Header";
import { userUserStore } from "./store/useAdminStore";

function App() {
  const user = userUserStore();
  console.log(user, "12");
  return <Header />;
}

export default App;
