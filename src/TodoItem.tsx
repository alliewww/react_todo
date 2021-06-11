import styled from "styled-components";
import React, { useState, useRef } from "react";
import * as Type from "./Type";

const ButtonWrapper = styled.button`
  float: right;
  margin-right: 2px;
`;

interface ITodoitemWrapper {
  $isDone: boolean;
}

const TodoitemWrapper = styled.div<ITodoitemWrapper>`
  margin-bottom: 2px;
  padding: 20px;
  border-style: solid;

  ${(props) =>
    props.$isDone &&
    `
    text-decoration:line-through;
    `}
`;

// hook
export default function TodoItem(props: Type.ITodoItemProps) {
  const { todo, handleDelete, handleDone, handleEdit } = props;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const setEdit = () => {
    if (inputRef.current?.value) handleEdit(todo.id, inputRef.current.value);
    setIsEdit(!isEdit);
  };
  return (
    <TodoitemWrapper $isDone={todo.isDone} >
      {!isEdit && todo.text}
      {/*uncontrolled component練習*/}
      {isEdit ? (
        <input ref={inputRef} type="text" defaultValue={todo.text} />
      ) : (
        todo.text
      )}
      <ButtonWrapper
        onClick={() => {
          handleDelete(todo.id);
        }}
      >
        刪除
      </ButtonWrapper>
      <ButtonWrapper
        onClick={() => {
          setEdit();
        }}
      >
        {isEdit ? "存檔" : "編輯"}
      </ButtonWrapper>
      <ButtonWrapper
        onClick={() => {
          handleDone(todo.id);
        }}
      >
        {todo.isDone ? "未完成" : "已完成"}
      </ButtonWrapper>
    </TodoitemWrapper>
  );
}

// class
// export default class Todoitem extends React.PureComponent<
//   Type.ITodoItemProps,
//   Type.ITodoitemState
// > {
//   private inputRef = React.createRef<HTMLInputElement>();
//   constructor(props: Type.ITodoItemProps) {
//     super(props);
//     this.state = {
//       isEdit: false,
//     };
//   }
//   setEdit = () => {
//     const { todo, handleEdit } = this.props;
//     const { isEdit } = this.state;
//     if (this.inputRef.current) handleEdit(todo.id, this.inputRef.current.value);
//     this.setState({
//       isEdit: !isEdit,
//     });
//   };
//   render() {
//     const { isEdit } = this.state;
//     const { todo, handleDelete, handleDone } = this.props;
//     return (
//       <TodoitemWrapper $isDone={todo.isDone}>
//         {isEdit ? (
//           <input ref={this.inputRef} type="text" defaultValue={todo.text} />
//         ) : (
//           todo.text
//         )}
//         <ButtonWrapper
//           onClick={() => {
//             handleDelete(todo.id);
//           }}
//         >
//           刪除
//         </ButtonWrapper>
//         <ButtonWrapper
//           onClick={() => {
//             this.setEdit();
//           }}
//         >
//           {isEdit ? "存檔" : "編輯"}
//         </ButtonWrapper>
//         <ButtonWrapper
//           onClick={() => {
//             handleDone(todo.id);
//           }}
//         >
//           {todo.isDone ? "未完成" : "已完成"}
//         </ButtonWrapper>
//       </TodoitemWrapper>
//     );
//   }
// }
