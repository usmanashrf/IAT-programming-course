
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
    <div className="flex  ">
      <div className='mx-10 my-10'>
      <h2 className='text-xl font-bold'>Task List</h2>
      <div className="mt-3 flex flex-col justify-center">
        <div className='flex space-x-24 mx-10'>
            <th className=''>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
        </div>
        <div>
          {tasks.map(task => (
            <div className='flex space-x-18' key={task.id}>
              <div className='flex space-x-20 my-2 mx-10'>
              <div>{task.id}</div>
              <div>{task.name}</div>
              <div>{task.status}</div>
              </div>
              
              <div className='ml-auto my-1 mx-10'>
                <Button className='bg-gray-300 hover:bg-gray-500 rounded-sm px-4 py-2' variant="primary" onClick={() => handleEdit(task)}>Edit</Button>{' '}
                <Button className='bg-red-300 hover:bg-red-500 rounded-sm px-4 py-2' variant="danger" onClick={() => handleDelete(task.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      <div className='my-20'>
      <Button className='bg-green-300 hover:bg-green-400 rounded-sm px-4 py-2' variant="success" onClick={handleCreate}>Create Task</Button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
       
        <Modal.Body>
  <div className="table ml-20 bg-slate-200 p-10">
    <tbody>
     
    
      <tr>
        <div>
          <Form.Group controlId="title">
            <div>
            <Form.Label>Title</Form.Label>
            </div>
            <div>
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
            
            </div>
            
          </Form.Group>
        </div>
        
      </tr>
      <tr>
      <td>
          <Form.Group controlId="description">
            <div>
            <Form.Label>Status</Form.Label>
            </div>
            <div>
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
          
            </div>
            <div className='flex justify-between mt-5'>
      <Button className='bg-red-300 hover:bg-red-400 rounded-sm px-2 py-1' variant="secondary" onClick={handleCloseModal}>Close</Button>
    <Button className='bg-green-300 hover:bg-green-400 rounded-sm px-2 py-1' variant="primary" onClick={handleSaveTask}>Save</Button>
      </div>
          </Form.Group>
        </td>
      </tr>
    </tbody>
  </div>
</Modal.Body>
      
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
}

export default App;
