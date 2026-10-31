import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [taskName, setTaskName] = useState('')
  const [tasks, setTasks] = useState(() => {
    const savedTasks =
    localStorage.getItem('homeCareTasks')
    return savedTasks ? 
    JSON.parse(savedTasks) : [] 
  })
  useEffect(() => {
    localStorage.setItem('homeCareTasks',JSON.stringify(tasks))
  },[tasks])
  const [category, setCategory] = useState('Cleaning')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate]  = useState('')
  const [status, setStatus] = useState('Pending')
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === 'Completed').length;
  const pendingTasks = tasks.filter(
    (task) => task.status === 'Pending').length;
  
  // Add new task
  function addTask() { 
    if (taskName.trim() === '') {
      alert('Please enter task name')
       return
    }
    const newTask = {
      name: taskName,
      category: category,
      priority: priority,
      dueDate: dueDate,
      status: 'Pending'
    }

    setTasks([...tasks, newTask])
    setTaskName('')
    setCategory('Cleaning')
    setPriority('Medium')
  }

    //Delete task
    function deleteTask(index){
      setTasks((previousTasks) => 
        previousTasks.filter((task, i) => i !== index))
    }
  return (
    <div className="app">
      <h1>Home Care 🏠</h1>

      <div className="dashboard">
       <div className="dashboard-card">
        <h3>Total Tasks</h3>
        <p>{totalTasks}</p>
       </div>

       <div className="dashboard-card">
        <h3>Completed</h3>
        <p>{completedTasks}</p>
       </div>

      <div className="dashboard-card">
       <h3>Pending</h3>
       <p>{pendingTasks}</p>
     </div>
    </div>

      <p>Home Maintenance Management Application</p>

      {/* Add Task Form */}
      <div className="task-form">
        <h2>Add Maintenance Task</h2>

        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
            
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Cleaning">Cleaning</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Gardening">Gardening</option>
          <option value="Other">Other</option>
        </select>
        
        <select

         value={priority} 
         onChange={(e) => 
      setPriority(e.target.value)} 
      > 
         <option value="High">High Priority</option>
         <option value="Medium">Medium Priority</option>
         <option value="Low">Low Priority</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
        setDueDate(e.target.value) } />
     
      <button type="button"
        onClick={addTask}>Add Task</button>
      </div>
      
      {/* Task List*/}
      <div className="task-list">
        <h2>My Maintenance Tasks</h2>

        {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
    ) : (
        tasks.map((task, index) => (
          <div className="task-item" key={index}>
            <p>{index + 1}.{task.name}-{task.category}-Priority:{task.priority} </p>

            <p>Due Date: {task.dueDate || 'Not selected'}</p>

            <p>Status: {task.status}</p>
 
      <button
         type="button"
         onClick={() => {
          setTasks(tasks.map((t, i) =>
           i === index
            ? {
               ...t,
               status: t.status === 'Pending'
                ? 'Completed'
                : 'Pending'
              }
            : t
          ))
        }}
       >
        {task.status === 'Pending' ? 'Mark Completed' : 'Mark Pending'}
      </button>

            <button 
              type="button"
              onClick={() => deleteTask(index)}> 
              Delete
            </button> 
          </div>
         ))
       )}
     </div>
   </div>
  )
}
export default App