// import logo from './logo.svg';
import "./App.css";
import ToDolist from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./contexts/todosContext";
import { v4 as id } from "uuid";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Amiri"],
  },
});
const initialTodos = [
  {
    id: id(),
    title: "قراءة كتاب",
    details: "رواية الأبله",
    isCompleted: false,
  },
  {
    id: id(),
    title: "قراءة كتاب",
    details: "رواية الأبله",
    isCompleted: false,
  },
  {
    id: id(),
    title: "قراءة كتاب",
    details: "رواية الأبله",
    isCompleted: false,
  },
];
function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#101827 ",
          marginTop: "40px",
        }}
      >
        <TodosContext.Provider value={{ todos: todos, setTodos: setTodos }}>
          <ToDolist />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
