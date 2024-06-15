<<<<<<< HEAD
import React, { memo, useEffect, useReducer, useRef, useState } from "react";
import { useSignal, useComputed, effect, signal } from "@preact/signals-react";
import { v4 as uuidV4 } from "uuid";
import { Button, Card, CardBody, Container, Form } from "react-bootstrap";
import "./index.css"


const initialTodos = [
  {
    id: uuidV4(),
    title: "Todo 1",
    complete: false,
  },
  {
    id: uuidV4(),
    title: "Todo 2",
    complete: false,
  },
];

const initialTodos2 = [
  { id: uuidV4(), title: "Write my first post", complete: true },
  { id: uuidV4(), title: "Buy new groceries", complete: false },
  { id: uuidV4(), title: "Walk the dog", complete: false }
];


const reducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};


const App = () => {

  const number = useSignal(0);
  setInterval(() => {
    number.value = Math.floor(Math.random() * 1000);
  }, 500)

  const input = useSignal("");

  const { isChecked, toggleCheckbox, isCheckedSignal } = useCheckboxState();
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const todoUseSignal = useSignal(initialTodos2);
  const todoUseSignal1 = useSignal(true);
  const compTodoSignal = useComputed(() => todoUseSignal1.toString())
  const changeTodo = () => {
    todoUseSignal1.value = !todoUseSignal1;
    console.log(todoUseSignal1)
  }

  const countSignal = useSignal(0)
  const incrementSignal = () => (countSignal.value += 1)
  const doubleSignal = useComputed(() => countSignal.value * 2)

  const handleComplete = (todo) => {
    dispatch({ type: "COMPLETE", id: todo.id });
  };

  const handleSignal = (todo) => {

    const newSignal = todoUseSignal.value.map((todo1) => {
      if (todo1.id === todo.id) {
        var newVal = { ...todo1 };
        newVal.complete = !newVal.complete;
        return newVal;
      } else {
        return todo1;
      }
    });

    todoUseSignal.value = newSignal;
    console.log(todoUseSignal);
  }

  effect(() => {
    if (countSignal.value > 10) countSignal.value = 0
  })

  console.log("Rendred");


  return (
    <Container style={{ direction: 'ltr' }} className="mt-5 text-left">
      <h1>{number}</h1>
      <Form.Control as='input' value={input} type="text"
        onChange={e => input.value = e.target.value} />
      <h2>{input}</h2>

      <Card className="mb-3 ps-2">
        <Card.Title>CheckBox with useReduce</Card.Title>
        <Card.Body>
          {todos.map((todo, i) => (
            <div key={`todo${i}`}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => handleComplete(todo)}
                />
                {todo.title}
              </label>
            </div>
          ))}
        </Card.Body>
      </Card>

      <Card className="mb-3 ps-2">
        <Card.Title>Increment with useSignal</Card.Title>
        <Card.Body>
          <Button onClick={incrementSignal}>
            count is <>{countSignal}</>
          </Button>
          <h5>
            Double is: <>{doubleSignal}</>
          </h5>
        </Card.Body>
      </Card>

      <Card className="mb-3 ps-2">
        <Card.Title>Multiple CheckBoxes with useSignal</Card.Title>
        <Card.Body>
          {todoUseSignal.value.map((todo, i) => (
            <div key={`todo${i + 2}`}>
              <label>
                <input
                  type="checkbox"
                  checked={Boolean(todo.complete)}
                  // onInput={() => handleComplete1(todo)}
                  onChange={() => handleSignal(todo)}
                />
                {todo.title}
              </label>
            </div>
          ))}
        </Card.Body>
      </Card>


      <Card className="mb-3 ps-2">
        <Card.Title>Single CheckBoxes with useSignal</Card.Title>
        <Card.Body>
          <label>
            <Form.Check // prettier-ignore
              type="checkbox"
              checked={todoUseSignal1}
              onChange={changeTodo}
            />
            Single element {compTodoSignal.value === true ? 'true' : 'false'}
          </label>
        </Card.Body>
      </Card>

      <Card className="mb-3 ps-2">
        <Card.Title>Single CheckBoxes with useRef</Card.Title>
        <Card.Body>
          <div>
            <input type="checkbox" ref={isCheckedSignal} onChange={toggleCheckbox} />
            <label htmlFor="checkbox">Check me</label>
            <Card.Text>{isCheckedSignal.current === true ? "true" : "false"}</Card.Text>
          </div>
        </Card.Body>
      </Card>

    </Container>
  );
};

export default App;

function useCheckboxState() {
  // const [isChecked, setIsChecked] = useState(false);
  const isCheckedSignal = useRef(false); // Create a ref to hold the signal

  const toggleCheckbox = () => {
    // setIsChecked(!isChecked);
    isCheckedSignal.current = !isCheckedSignal.current; // Update signal on change
    console.log(isCheckedSignal.current)
  };

  return { toggleCheckbox, isCheckedSignal };
}
=======
import React, { memo, useEffect, useReducer, useRef, useState } from "react";
import { useSignal, useComputed, effect, signal } from "@preact/signals-react";
import { v4 as uuidV4 } from "uuid";
import { Button, Card, CardBody, Container, Form } from "react-bootstrap";
import "./index.css"


const initialTodos = [
  {
    id: uuidV4(),
    title: "Todo 1",
    complete: false,
  },
  {
    id: uuidV4(),
    title: "Todo 2",
    complete: false,
  },
];

const initialTodos2 = [
  { id: uuidV4(), title: "Write my first post", complete: true },
  { id: uuidV4(), title: "Buy new groceries", complete: false },
  { id: uuidV4(), title: "Walk the dog", complete: false }
];


const reducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};


const App = () => {

  const number = useSignal(0);
  setInterval(() => {
    number.value = Math.floor(Math.random() * 1000);
  }, 500)

  const input = useSignal("");

  const { isChecked, toggleCheckbox, isCheckedSignal } = useCheckboxState();
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const todoUseSignal = useSignal(initialTodos2);
  const todoUseSignal1 = useSignal(true);
  const compTodoSignal = useComputed(() => todoUseSignal1.toString())
  const changeTodo = () => {
    todoUseSignal1.value = !todoUseSignal1;
    console.log(todoUseSignal1)
  }

  const countSignal = useSignal(0)
  const incrementSignal = () => (countSignal.value += 1)
  const doubleSignal = useComputed(() => countSignal.value * 2)

  const handleComplete = (todo) => {
    dispatch({ type: "COMPLETE", id: todo.id });
  };

  const handleSignal = (todo) => {

    const newSignal = todoUseSignal.value.map((todo1) => {
      if (todo1.id === todo.id) {
        var newVal = { ...todo1 };
        newVal.complete = !newVal.complete;
        return newVal;
      } else {
        return todo1;
      }
    });

    todoUseSignal.value = newSignal;
    console.log(todoUseSignal);
  }

  effect(() => {
    if (countSignal.value > 10) countSignal.value = 0
  })

  console.log("Rendred");


  return (
    <Container style={{ direction: 'ltr' }} className="mt-5 text-left">
      <h1>{number}</h1>
      <Form.Control as='input' value={input} type="text"
        onChange={e => input.value = e.target.value} />
      <h2>{input}</h2>

      <Card className="mb-3 ps-2">
        <Card.Title>CheckBox with useReduce</Card.Title>
        <Card.Body>
          {todos.map((todo, i) => (
            <div key={`todo${i}`}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => handleComplete(todo)}
                />
                {todo.title}
              </label>
            </div>
          ))}
        </Card.Body>
      </Card>

      <Card className="mb-3 ps-2">
        <Card.Title>Increment with useSignal</Card.Title>
        <Card.Body>
          <Button onClick={incrementSignal}>
            count is <>{countSignal}</>
          </Button>
          <h5>
            Double is: <>{doubleSignal}</>
          </h5>
        </Card.Body>
      </Card>

      <Card className="mb-3 ps-2">
        <Card.Title>Multiple CheckBoxes with useSignal</Card.Title>
        <Card.Body>
          {todoUseSignal.value.map((todo, i) => (
            <div key={`todo${i + 2}`}>
              <label>
                <input
                  type="checkbox"
                  checked={Boolean(todo.complete)}
                  // onInput={() => handleComplete1(todo)}
                  onChange={() => handleSignal(todo)}
                />
                {todo.title}
              </label>
            </div>
          ))}
        </Card.Body>
      </Card>


      <Card className="mb-3 ps-2">
        <Card.Title>Single CheckBoxes with useSignal</Card.Title>
        <Card.Body>
          <label>
            <Form.Check // prettier-ignore
              type="checkbox"
              checked={todoUseSignal1}
              onChange={changeTodo}
            />
            Single element {compTodoSignal.value === true ? 'true' : 'false'}
          </label>
        </Card.Body>
      </Card>

      <Card className="mb-3 ps-2">
        <Card.Title>Single CheckBoxes with useRef</Card.Title>
        <Card.Body>
          <div>
            <input type="checkbox" ref={isCheckedSignal} onChange={toggleCheckbox} />
            <label htmlFor="checkbox">Check me</label>
            <Card.Text>{isCheckedSignal.current === true ? "true" : "false"}</Card.Text>
          </div>
        </Card.Body>
      </Card>

    </Container>
  );
};

export default App;

function useCheckboxState() {
  // const [isChecked, setIsChecked] = useState(false);
  const isCheckedSignal = useRef(false); // Create a ref to hold the signal

  const toggleCheckbox = () => {
    // setIsChecked(!isChecked);
    isCheckedSignal.current = !isCheckedSignal.current; // Update signal on change
    console.log(isCheckedSignal.current)
  };

  return { toggleCheckbox, isCheckedSignal };
}
>>>>>>> 80af62dbefbeccbf611f3c65aede4ade31d713c9
