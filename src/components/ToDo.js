import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

// DIALOG
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

// HOCKS
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todosContext";

export default function ToDo({ todo, handelChick }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  // HANDEL EVENTS
  function handelChickClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handelDeleteClick() {
    setShowDeleteDialog(true);
  }
  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }
  function handleDeleteClose() {
    setShowDeleteDialog(false);
  }
  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }
  function handelDeleteTask() {
    const deleteTodo = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(deleteTodo);
    localStorage.setItem("todos", JSON.stringify(deleteTodo));
  }

  function handleUpdateTask() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updateTodo.title, details: updateTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  return (
    <>
      <Container maxWidth="sm">
        {/* DELETE DIALOG */}

        <Dialog
          onClose={handleDeleteClose}
          open={showDeleteDialog}
          // slots={{
          //   transition: Transition,
          // }}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
          role="alertdialog"
        >
          <DialogTitle>{"حذف المهمة"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              هل انت متأكد من حذف المهمة؟ لا يمكنك التراجع بعد عملية الحذف
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose} autoFocus>
              إغلاق
            </Button>
            <Button onClick={handelDeleteTask}>حذف</Button>
          </DialogActions>
        </Dialog>
        {/* ==== DELETE DIALOG ==== */}

        {/* UPDATED TASKS */}
        <Dialog
          onClose={handleUpdateClose}
          open={showUpdateDialog}
          // slots={{
          //   transition: Transition,
          // }}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
          role="alertdialog"
        >
          <DialogTitle>{"تعديل المهمة"}</DialogTitle>
          <DialogContent>
            <TextField
              required
              margin="dense"
              id="name"
              name="email"
              label="عنوان المهمة"
              fullWidth
              variant="standard"
              value={updateTodo.title}
              error={!updateTodo.title.trim()}
              helperText={!updateTodo.title.trim() ? "عنوان المهمة مطلوب" : ""}
              onChange={(e) => {
                setUpdateTodo({ ...updateTodo, title: e.target.value });
              }}
            />
            <TextField
              required
              margin="dense"
              id="name"
              name="email"
              label="تفاصيل المهمة"
              fullWidth
              variant="standard"
              value={updateTodo.details}
              onChange={(e) => {
                setUpdateTodo({ ...updateTodo, details: e.target.value });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateClose} autoFocus>
              إغلاق
            </Button>
            <Button
              onClick={handleUpdateTask}
              disabled={!updateTodo.title.trim()}
            >
              تأكيد
            </Button>
          </DialogActions>
        </Dialog>
        {/*==== UPDATED TASKS ====*/}

        <Card
          className="crd"
          sx={{
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <CardContent>
            <Grid container spacing={1}>
              <Grid size={{ xs: 7 }}>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "right",
                    textDecoration: todo.isCompleted ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "right",
                    textDecoration: todo.isCompleted ? "line-through" : "none",
                  }}
                >
                  {todo.details}
                </Typography>
              </Grid>
              <Grid
                size={5}
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <IconButton
                  className="btnCheck"
                  aria-label="check"
                  style={{
                    color: todo.isCompleted ? "white" : "#8bc34a",
                    background: todo.isCompleted ? "#8bc34a" : "white",
                    border: "solid green 1px",
                  }}
                >
                  <CheckIcon
                    onClick={() => {
                      handelChickClick();
                    }}
                    // sx={{ color: "green" }}
                  />
                </IconButton>

                {/* UPDATE CLICK */}
                <IconButton
                  onClick={handleUpdateClick}
                  className="btnCheck"
                  aria-label="check"
                  style={{
                    color: "#98d84e",
                    background: "white",
                    border: "solid blue 1px",
                  }}
                >
                  <ModeEditIcon sx={{ color: "blue" }} />
                </IconButton>
                {/* === UPDATE CLICK ==== */}

                <IconButton
                  onClick={handelDeleteClick}
                  className="btnCheck"
                  aria-label="check"
                  style={{
                    color: "#98d84e",
                    background: "white",
                    border: "solid red 1px",
                  }}
                >
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
