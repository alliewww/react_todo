import React, {
  useState,
  useRef,
  useEffect,
  useCallback /*, useLayoutEffect */,
  useMemo,
} from "react";
import * as Type from "./Type";

export default function useTodos() {
  const id = useRef(0);

  const [todos, setTodos] = useState<Type.ITodoItem[]>(() => {
    const todoData: Type.ITodoItem[] = JSON.parse(window.localStorage.getItem("todos")||"[]");
    
    if (todoData.length !== 0) {
      id.current = todoData[todoData.length - 1].id + 1;
    }
    return todoData;
  });

  const [value, setValue] = useState<string>("");
  const [radio, setRadio] = useState<string>("all");

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  const handleInput = useCallback(() => {
    if (!value) return;
    setTodos([...todos, { id: id.current, text: value, isDone: false }]);
    id.current++;
    setValue("");
  }, [value, todos]);

  const handleDelete = useCallback(
    (id: number) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const handleDone = useCallback(
    (id: number) => {
      function todoDone(todo: Type.ITodoItem) {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        } else {
          return todo;
        }
      }
      setTodos(todos.map(todoDone));
    },
    [todos]
  );

  const handleEdit = useCallback(
    (id: number, text: string) => {
      function todoEdit(todo: Type.ITodoItem) {
        if (todo.id === id) {
          return {
            ...todo,
            text: text,
          };
        } else {
          return todo;
        }
      }
      setTodos(todos.map(todoEdit));
    },
    [todos]
  );

  const handleRadioChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRadio(e.target.value);
    },
    []
  );

  // useCallback(fn, deps) 相等於 useMemo(() => fn, deps)
  // useCallback 用 useMemo 做的
  // useCallback 回傳func

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (radio === "all") return true;
      return radio === "undone" ? !todo.isDone : todo.isDone;
    });
  }, [todos, radio]); //回傳變數
  return {
    todos: filteredTodos,
    setTodos,
    value,
    setValue,
    radio,
    handleTextChange,
    handleInput,
    handleDelete,
    handleDone,
    handleEdit,
    handleRadioChange,
  };
}
