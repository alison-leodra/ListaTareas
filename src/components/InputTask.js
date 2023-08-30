import { Select, Input, Button, Header, Icon, Grid } from "semantic-ui-react"
import { useState } from "react"
import "semantic-ui-css/semantic.min.css";
import { v4 as uuidv4 } from "uuid"

const options = [
  { key: "deporte", text: "Deporte", value: "deporte" },
  { key: "casa", text: "Casa", value: "casa" },
  { key: "oficina", text: "Oficina", value: "oficina" },
  { key: "otra", text: "Otra", value: "otra" },
]

export default function InputTask(props) {

  const [task, setTask] = useState({
    idTask: "",
    taskName: "",
    categoryTask: ""
  })

  const [error, setError] = useState(false)

  const { createTask } = props;

  function onchangeTask(e) {
    setTask({
      //los 3 puntos es que lo que tenia la tarea lo tomamos y lo usaremos.
      ...task,
      [e.target.name]: e.target.value
    })
  }

  const onchangeCategoryTask = (e, data) => {
    setTask({
      ...task,
      [data.name]: data.value
    })
  }

  const onSubmitTask = (e) => {

    //que no recargue la pagina
    e.preventDefault();

    //validacion
    if (task.taskName.trim() === "") {
      setError(true);
      return;
    }
    //eliminar el mensaje previo
    setError(false)

    //asigmar un ID
    task.idTask = uuidv4();

    //crear la tarea
    createTask(task);

    //limpiar inputs
    setTask({
      idTask: "",
      taskName: "",
      categoryTask: ""
    })

  }


  return (
    <>
      <Grid centered columns={2}>
        <Input type="text" action>
          <Input
            size="small"
            icon="add"
            placeholder="Escribe tu tarea..."
            iconPosition="left"
            name="taskName"
            value={task.taskName}
            onChange={onchangeTask}
          >
          </Input>
          <Select
            compact options={options}
            className="select-form-task"
            name="categoryTask"
            placeholder="Categoria"
            value={task.categoryTask}
            onChange={onchangeCategoryTask}
          />
          <Button
            type="submit"
            color="violet"
            onClick={onSubmitTask}
          >
            Anadir tarea
          </Button>
        </Input>
      </Grid>
      {error && (
        <Grid centered>
          <Header as="h4" color="red" className="alert-error-form">
            <Icon name="close"></Icon>
            <Header.Content>La tarea es obligatoria </Header.Content>
            <Icon name="close"></Icon>
          </Header>
        </Grid>
      )}
    </>
  )
}