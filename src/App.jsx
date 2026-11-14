import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-5">
          <Typography variant="h4">Welcome Back</Typography>

          <Typography color="text.secondary">Login to your account</Typography>

          <TextField label="Email" fullWidth variant="outlined" />

          <TextField label="Password" type="password" fullWidth />

          <Button variant="contained" fullWidth>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
