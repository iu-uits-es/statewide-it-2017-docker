import React from 'react';
import { Button, Col, ListGroup, ListGroupItem, Panel, Row } from 'react-bootstrap';

import TodoForm from './TodoForm';

const Todo = ({ id, onComplete, summary, todo }) => (
  <ListGroupItem>
    <Button bsStyle="success" bsSize="xs" onClick={() => onComplete(id)}>&#x2713;</Button>
    {' ' + summary}
  </ListGroupItem>
);

const TodoHeader = ({ onCloseForm, onCompleteTodo, onCreateTodo, onOpenForm, showForm }) => (
  <div className="clearfix">
    <strong className="pull-left">Todo List</strong>
    <TodoForm onCloseForm={onCloseForm} onOpenForm={onOpenForm} onCreateTodo={onCreateTodo} showForm={showForm} />
  </div>
);

const TodoList = ({ onCloseForm, onCompleteTodo, onCreateTodo, onOpenForm, showForm, todos }) => {
  let formattedTodos = [];
  if(!todos || todos.length === 0) {
    formattedTodos = <ListGroupItem className="text-center"><em>Nothing to do!</em></ListGroupItem>;
  } else {
    formattedTodos = todos.map((todo) => {
      return (
        <Todo key={todo._id} id={todo._id} summary={todo.summary} onComplete={onCompleteTodo} />
      );
    })
  }
  return (
    <Row>
      <Col md={6} mdOffset={3}>
        <Panel header={<TodoHeader onCloseForm={onCloseForm} onCreateTodo={onCreateTodo} onOpenForm={onOpenForm} showForm={showForm} />} bsStyle="primary">
          <ListGroup fill>
            { formattedTodos }
          </ListGroup>
        </Panel>
      </Col>
    </Row>
  )
};

export default TodoList;
