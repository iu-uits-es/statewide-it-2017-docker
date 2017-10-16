import React from 'react';
import { Button, FormControl, Glyphicon, Modal } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

const Input = ({ input, meta, ...props }) => (
    <FormControl {...input} {...props} />
);

const TodoForm = ({ handleSubmit, onCloseForm, onCreateTodo, onOpenForm, reset, showForm = false }) => (
    <div>
        <Button bsStyle="info" bsSize="xs" className="pull-right" onClick={onOpenForm}>
            <Glyphicon glyph="plus" />
        </Button>

        <Modal show={showForm} onHide={onCloseForm}>
            <form onSubmit={handleSubmit((todo) => {
                onCreateTodo(todo);
                onCloseForm();
                reset();
            })}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Field name="summary" component={Input} type="text" placeholder="Todo text" autoFocus autoComplete="off" />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onCloseForm}>Cancel</Button>
                    <Button type="submit" bsStyle="primary">Create</Button>
                </Modal.Footer>
            </form>
        </Modal>
    </div>
);

export default reduxForm({
    form: 'todo'
})(TodoForm);
