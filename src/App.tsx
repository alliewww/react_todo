import styled from "styled-components";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import TodoItem from "./TodoItem";
import useTodos from "./useTodos";
import * as Type from "./Type";
const AppWrapper = styled.div``;

const filter = ["all", "done", "undone"];

// hook
export default function App() {
  const {
    todos,
    value,
    radio,
    handleTextChange,
    handleInput,
    handleDelete,
    handleDone,
    handleEdit,
    handleRadioChange,
  } = useTodos();

  return (
    <AppWrapper>
      {/*controlled component練習*/}
      <input type="text" onChange={handleTextChange} value={value} />
      <button type="submit" onClick={handleInput} >
        新增
      </button>
      <div>
        <label>篩選：</label>
        {filter.map((type) =>
          <React.Fragment key={type}>
            <input
              type="radio"
              value={type}
              checked={radio === type}
              onChange={handleRadioChange}
            />{type}
          </React.Fragment>
        )}
      </div>
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={"todoID" + todo.id}
          handleDelete={handleDelete}
          handleDone={handleDone}
          handleEdit={handleEdit}
        />
      ))}
    </AppWrapper>
  );
}

// class
// export default class App extends React.Component<{}, Type.IAppState> {
//   private id: number = 0;
//   constructor(props: Readonly<{}>) {
//     super(props);
//     this.state = {
//       todos: [],
//       value: "",
//       radio: "all",
//     };
//   }
//   componentDidMount() {
//     const todoData: Type.ITodoItem[] = JSON.parse(
//       window.localStorage.getItem("todos") || ""
//     );
//     if (todoData.length !== 0) {
//       this.id = todoData[todoData.length - 1].id + 1;
//     }
//     this.setState({
//       todos: todoData,
//     });
//   }
//   componentDidUpdate() {
//     const { todos } = this.state;
//     window.localStorage.setItem("todos", JSON.stringify(todos));
//   }
//   handleInput = () => {
//     const { todos, value } = this.state;
//     if (!value) return;
//     this.setState({
//       todos: [...todos, { id: this.id, text: value, isDone: false }],
//       value: "",
//     });

//     this.id++;
//   };
//   handleDelete = (id: number) => {
//     const { todos } = this.state;
//     function todoDelete(todo: Type.ITodoItem) {
//       return todo.id !== id;
//     }
//     this.setState({
//       todos: todos.filter(todoDelete),
//     });
//   };
//   handleDone = (id: number) => {
//     const { todos } = this.state;
//     function todoDone(todo: Type.ITodoItem) {
//       if (todo.id === id) {
//         return {
//           ...todo,
//           isDone: !todo.isDone,
//         };
//       } else {
//         return todo;
//       }
//     }
//     this.setState({
//       todos: todos.map(todoDone),
//     });
//   };
//   handleEdit = (id: number, text: string) => {
//     const { todos } = this.state;
//     function todoEdit(todo: Type.ITodoItem) {
//       if (todo.id === id) {
//         return {
//           ...todo,
//           text: text,
//         };
//       } else {
//         return todo;
//       }
//     }
//     this.setState({
//       todos: todos.map(todoEdit),
//     });
//   };
//   handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       value: e.target.value,
//     });
//   };

//   handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       radio: e.target.value,
//     });
//   };

//   filteredTodos = () => {
//     const { todos, radio } = this.state;
//     return todos.filter((todo) => {
//       if (radio === "all") return true;
//       return radio === "undone" ? !todo.isDone : todo.isDone;
//     });
//   };

//   render() {
//     const { value, radio } = this.state;
//     const todos = this.filteredTodos();
//     return (
//       <AppWrapper>
//         <input value={value} type="text" onChange={this.handleChange} />
//         <button type="submit" onClick={this.handleInput}>
//           新增
//         </button>
//         <div>
//           <label>篩選：</label>
//           {filter.map((type) => (
//             <React.Fragment key={type}>
//               <input
//                 type="radio"
//                 value={type}
//                 checked={radio === type}
//                 onChange={this.handleRadioChange}
//               />
//               {type}
//             </React.Fragment>
//           ))}
//         </div>
//         {todos.map((todo) => (
//           <TodoItem
//             todo={todo}
//             key={"todoID" + todo.id}
//             handleDelete={this.handleDelete}
//             handleDone={this.handleDone}
//             handleEdit={this.handleEdit}
//           />
//         ))}
//       </AppWrapper>
//     );
//   }
// }
