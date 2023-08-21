
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap'; // Import Bootstrap components

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [newTask, setNewTask] = useState({ name: '', status: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch('http://localhost:4000/tasks')
      .then(response => response.json())
      .then(data => {
        setTasks(data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  const handleCreate = () => {
    setShowModal(true);
  };
  
  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };
  
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/tasks/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          fetchTasks();
        } else {
          console.error('Failed to delete task');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  const handleCloseModal = () => {
    setSelectedTask({});
    setShowModal(false);
  };
  
  const handleSaveTask = () => {
    if (selectedTask.id) {
      // Update existing task
      fetch(`http://localhost:4000/tasks/${selectedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedTask),
      })
        .then(response => {
          if (response.ok) {
            fetchTasks();
            handleCloseModal();
          } else {
            console.error('Failed to update task');
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      const requestBody = {
        name: newTask.name,
        status: newTask.status
      };
      // Create new task
      fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then(response => {
          if (response.ok) {
            fetchTasks();
            handleCloseModal();
          } else {
            console.error('Failed to create task');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h2>Task List</h2>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.status}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(task)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(task.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="success" onClick={handleCreate}>Create Task</Button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
       
        <Modal.Body>
  <table className="table">
    <tbody>
      <tr>
        <td>
          <Form.Group controlId="title">
            <td>
            <Form.Label>Title</Form.Label>
            </td>
            <td>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={selectedTask.name || newTask.name}
              onChange={(e) => {
                if (selectedTask.id) {
                  setSelectedTask({ ...selectedTask, name: e.target.value });
                } else {
                  setNewTask({ ...newTask, name: e.target.value });
                }
              }}
            />
            </td>
            
          </Form.Group>
        </td>
        
      </tr>
      <tr>
      <td>
          <Form.Group controlId="description">
            <td>
            <Form.Label>Status</Form.Label>
            </td>
            <td>
            <Form.Control
              type="text"
              placeholder="Enter status"
              value={selectedTask.status || newTask.status}
              onChange={(e) => {
                if (selectedTask.id) {
                  setSelectedTask({ ...selectedTask, status: e.target.value });
                } else {
                  setNewTask({ ...newTask, status: e.target.value });
                }
              }}
            />
          
            </td>
          </Form.Group>
        </td>
      </tr>
    </tbody>
  </table>
</Modal.Body>
      
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveTask}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
