import React, {
  Component,
  createRef,
  useCallback,
  useRef,
  useState,
} from "react";

const TodoInFuncComponent = () => {
  const todoInputRef = useRef();
  const todoEditInputRef = useRef();

  const [editTodoId, setEditTodoId] = useState(null);
  const [todos, setTodos] = useState([
    { id: 1, todo: "Meeting at 4pm tomorrow.", completed: false },
  ]);

  const addTodo = useCallback(() => {
    setTodos([
      ...todos, //... spread oprator & rest oprator
      {
        id: todos.length + 1,
        todo: todoInputRef.current.value,
        completed: false,
      },
    ]);
    todoInputRef.current.value = "";
  }, [todos]);

  const handleEdit = useCallback(() => {
    const newTodo = todos.map((item) => {
      if (editTodoId === item.id) {
        return { ...item, todo: todoEditInputRef.current.value };
      }
      return item;
    });
    setTodos(newTodo); // rendering
    setEditTodoId(null); // rendering
  }, [todos, editTodoId]);

  const selectForEdit = useCallback((item) => {
    setEditTodoId(item.id);
    todoEditInputRef.current.value = item.todo;
  }, []);

  const handleComplete = useCallback(
    (todoId) => {
      const newTodo = todos.map((item) => {
        if (todoId === item.id) {
          return { ...item, completed: !item.completed };
        }
        return item; // { id: 1, todo: "Meeting at 4pm tomorrow.", completed: false, completed: true }
      });
      setTodos(newTodo);
    },
    [todos]
  );

  return (
    <div>
      <h3>Todos - Functional Component</h3>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <input
          ref={(ref) => (todoInputRef.current = ref)} // Uncontrolled component
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      {todos.map((item) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }} key={item.id}>
            <input
              ref={(ref) => (todoEditInputRef.current = ref)}
              style={{ display: editTodoId === item.id ? "block" : "none" }}
              onBlur={handleEdit}
            />
            <p
              onDoubleClick={() => selectForEdit(item)}
              style={{
                display: editTodoId !== item.id ? "block" : "none",
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              {item.todo}
            </p>
            <p> - {item.completed ? "Completed" : "Due"} </p>
            <button onClick={() => handleComplete(item.id)}>
              {item.completed ? "Todo not done" : "Todo done"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

class TodoInClassComponent extends Component {
  constructor(props) {
    super(props);
    this.todoInputRef = createRef();
    this.todoEditInputRef = createRef();
    this.state = {
      //replace
      todo: "",
      editTodoId: null,
      todos: [{ id: 1, todo: "Meeting at 4pm tomorrow.", completed: false }], // array of objects
    };
  }

  addTodo = () => {
    console.log(this.todoInputRef.current.value);
    this.setState(
      {
        todos: [
          ...this.state.todos,
          {
            id: this.state.todos.length + 1,
            todo: this.todoInputRef.current.value,
            completed: false,
          },
        ],
      },
      () => {
        this.todoInputRef.current.value = "";
      }
    ); //... spread oprator & rest oprator
  };

  handleComplete = (todoId) => {
    const newTodo = this.state.todos.map((item) => {
      if (todoId === item.id) {
        return { ...item, completed: !item.completed };
      }
      return item; // { id: 1, todo: "Meeting at 4pm tomorrow.", completed: false, completed: true }
    });
    this.setState({
      todos: newTodo,
    });
  };

  handleEdit = () => {
    const newTodo = this.state.todos.map((item) => {
      if (this.state.editTodoId === item.id) {
        return { ...item, todo: this.todoEditInputRef.current.value };
      }
      return item; // { id: 1, todo: "Meeting at 4pm tomorrow.", completed: false, completed: true }
    });
    this.setState({
      // patch
      editTodoId: null,
      todos: newTodo,
    });
  };

  selectForEdit = (item) => {
    this.setState({ editTodoId: item.id }, () => {
      this.todoEditInputRef.current.value = item.todo;
    });
  };

  render() {
    console.log("I am rendering");
    return (
      <div>
        <h3>Todos - Class Component</h3>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            ref={this.todoInputRef} // Uncontrolled component
          />
          <button onClick={this.addTodo}>Add Todo</button>
        </div>
        {this.state.todos.map((item) => {
          return (
            <div
              style={{ display: "flex", flexDirection: "row" }}
              key={item.id}
            >
              {this.state.editTodoId === item.id ? (
                <input ref={this.todoEditInputRef} onBlur={this.handleEdit} />
              ) : (
                <p
                  onDoubleClick={() => this.selectForEdit(item)}
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.todo}
                </p>
              )}
              <p> - {item.completed ? "Completed" : "Due"} </p>
              {/* {!item.completed && (
                <button
                  onClick={
                    this.state.editTodoId === item.id
                      ? this.handleEdit
                      : () => this.selectForEdit(item)
                  }
                >
                  {this.state.editTodoId === item.id ? "Edit done" : "Edit"}
                </button>
              )} */}
              <button onClick={() => this.handleComplete(item.id)}>
                {item.completed ? "Todo not done" : "Todo done"}
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

const App = () => {
  return (
    <div>
      <TodoInFuncComponent />
      <TodoInClassComponent />
    </div>
  );
};

export default App;
