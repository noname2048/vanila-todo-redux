import { createStore } from "redux"

const form = document.querySelector("form")
const input = document.querySelector("input")
const ul = document.querySelector("ul");

// redux PATTEN 
// 01. action types

const ADD_TODO = "ADD_TODO"
const DELETE_TODO = "DELETE_TODO"

// redux PATTEN 
// 02. functions that return actions

const addToDo = (text) => {
  return (
    { type: ADD_TODO, text }
  )
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id
  }
}

// redux PATTEN 
// 03. reducer

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE_TODO:
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return [];
  }
};

// redux PATTEN 
// 04. create store and argumnet is reducer

const store = createStore(reducer);

// redux PATTEN 
// 05. make subscribe function

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");

    btn.innerText = "DEL"
    btn.addEventListener("click", dispatchDeleteToDo);

    li.id = toDo.id;
    li.innerText = toDo.text;
    
    li.appendChild(btn);
    ul.appendChild(li);
  })
}

// redux PATTEN 
// 06. do subscribe

store.subscribe(paintToDos);

// redux PATTEN 
// 07. handler functions

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
}

// redux PATTEN 
// 08. logics

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
