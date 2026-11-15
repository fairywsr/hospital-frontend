import Header from "./components/Header";
import { userUserStore } from "./store/useAdminStore";

function App() {
  const user = userUserStore();
  console.log(user, "12");
  return <Header />;
}

export default App;
