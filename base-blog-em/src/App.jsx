import { Posts } from "./Posts";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    //4. Adding a Query Client and Provider
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog &apos;em Ipsum</h1>
        <Posts />
      </div>
      {/*7. Adding React Query Dev Tools */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
