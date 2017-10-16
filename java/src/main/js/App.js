import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';

import TodoList from './TodoList';
import { closeForm, completeTodo, createTodo, fetchTodos, openForm } from './reducer';

const mapStateToProps = ({ todo: { showForm, todos } }) => ({
  showForm,
  todos: todos.filter(todo => !todo.done)
});

const mapDispatchToProps = (dispatch) => ({
  onCloseForm: () => dispatch(closeForm()),
  onCompleteTodo: (id) => dispatch(completeTodo(id)),
  onCreateTodo: (todo) => dispatch(createTodo(todo)),
  onLoad: () => dispatch(fetchTodos()),
  onOpenForm: () => dispatch(openForm())
});

class App extends Component {

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <Grid>
        <TodoList {...this.props} />
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
