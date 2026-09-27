import * as React from "react";
// import CssBaseline from '@mui/material/CssBaseline';
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Divider from '@mui/material/Divider';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ListIcon from "@mui/icons-material/List";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import "../styles.css";
import ToDo from "./ToDo";

// OTHERS
import { useContext, useState, useEffect } from "react";
import { TodosContext } from "../contexts/todosContext";
import { v4 as id } from "uuid";

export default function ToDolist() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // Filter arrays
  const completedTask = todos.filter((t) => {
    return t.isCompleted;
  });
  const notCompletedTask = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRender = todos;
  if (displayedTodosType === "completed") {
    todosToBeRender = completedTask;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRender = notCompletedTask;
  } else {
    todosToBeRender = todos;
  }

  const todoJsx = todosToBeRender.map((t) => {
    return <ToDo key={t.id} todo={t} />;
  });

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];

    setTodos(storageTodos);
  }, []);
  function changeDisplayedType(e, newValue) {
    if (newValue !== null) {
      setDisplayedTodosType(newValue);
    }
  }
  function handelAddClick() {
    const newTodo = {
      id: id(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    setTitleInput("");
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{
          background: "#f8fbff",
          borderRadius: "24px",
          padding: "30px",
          maxHeight: "80vh",
          overflow: "scroll",
          overflowX: "hidden",
          scrollbarWidth: "none",
        }}
      >
        <CardContent>
          <Typography
            variant="h3"
            style={{ fontFamily: "Amiri", fontWeight: "Italic" }}
          >
            قائمة المهام
          </Typography>
          <hr style={{ border: "none", borderTop: "2px solid #8dc8f9a4" }} />

          {/* FILLTER BUTTONS */}
          <ToggleButtonGroup
            value={displayedTodosType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="Platform"
          >
            <ToggleButton className="btn" value="all">
              كل ألمهام
            </ToggleButton>
            <ToggleButton className="btn" value="completed">
              المنجز
              <CheckCircleIcon sx={{ margin: "2px" }} />
            </ToggleButton>
            <ToggleButton className="btn" value="non-completed">
              غيرالمنجز
              <AccessTimeIcon style={{ margin: "2px" }} />
            </ToggleButton>
          </ToggleButtonGroup>

          {/* === FILLTER BUTTONS */}

          {todoJsx}

          <Grid
            sx={{
              width: "90%",
              margin: "auto",
              marginTop: 2,
            }}
            container
            spacing={1}
          >
            <Grid
              size={{ xs: 12, sm: 8 }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {displayedTodosType === "all" && (
                <TextField
                  style={{ width: "100%" }}
                  className="inputBtn"
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              )}
            </Grid>
            <Grid
              size={{ xs: 12, sm: 4 }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              style={{ marginTop: "10px" }}
            >
              {displayedTodosType === "all" && (
                <Button
                  onClick={() => {
                    handelAddClick();
                  }}
                  className="addBtn"
                  variant="contained"
                  disabled={titleInput.length === 0}
                >
                  إضافة مهمة
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
