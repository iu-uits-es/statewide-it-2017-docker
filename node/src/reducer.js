import { createAction, handleActions } from 'redux-actions';

// Action Constants
const CLOSE_FORM = 'todo/todo/CLOSE_FORM';
const COMPLETE_TODO = 'todo/todo/COMPLETE_TODO';
const CREATE_TODO = 'todo/todo/CREATE_TODO';
const OPEN_FORM = 'todo/todo/OPEN_FORM';
const RECEIVE_TODOS = 'todo/todo/RECEIVE_TODOS';

// Action Creators
export const closeForm = createAction(CLOSE_FORM);

export const completeTodo = (id) => (dispatch) => {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  fetch('todos/' + id, { method: 'PATCH', body: JSON.stringify({ done: true }), headers: headers })
    .then(response => dispatch(createAction(COMPLETE_TODO)({ id })));
}

export const createTodo = (todo) => (dispatch) => {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  fetch('todos', { method: 'POST', body: JSON.stringify(todo), headers: headers })
    .then(response => response.json())
    .then(json => dispatch(createAction(CREATE_TODO)(json)));
}

export const fetchTodos = () => (dispatch) =>
  fetch('todos')
    .then(response => response.json())
    .then(json => dispatch(createAction(RECEIVE_TODOS)(json)));

export const openForm = createAction(OPEN_FORM);

// Action Handlers
const closeFormHandler = (state) => ({
  ...state,
  showForm: false
});

const completeTodoHandler = (state, action) => ({
  ...state,
  todos: state.todos.map(todo => todo._id === action.payload.id ? { ...todo, done: true } : todo)
});

const createTodoHandler = (state, action) => ({
  ...state,
  todos: [ ...state.todos, { id: action.payload.summary, ...action.payload } ]
});

const receiveTodosHandler = (state, action) => ({
  ...state,
  todos: action.payload
});

const openFormHandler = (state) => ({
  ...state,
  showForm: true
});

const defaultState = {
  showForm: false,
  todos: []
};

// Reducer
export default handleActions({
  [CLOSE_FORM]: closeFormHandler,
  [COMPLETE_TODO]: completeTodoHandler,
  [CREATE_TODO]: createTodoHandler,
  [OPEN_FORM]: openFormHandler,
  [RECEIVE_TODOS]: receiveTodosHandler
}, defaultState);
