import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addTodo = (e) => {
    const existed = todos.includes(todo);
    if (!todo.trim()) {
      toast.error('Vui lòng nhập công việc');
      return;
    }

    if (editingIndex !== null) {
      const updatedTodos = todos.map((item, idx) => idx === editingIndex ? todo : item);
      setTodos(updatedTodos);
      setEditingIndex(null);
      setTodo('');
      toast.success('Cập nhật thành công');
      return;
    }

    if (existed) {
      toast.error('Công việc đã tồn tại');
      return;
    }

    setTodos([...todos, todo]);
    setTodo('');
  }

  const deleteTodo = (index) => {
    setTodos(todos.filter((todo, idx) => idx !== index));
  }

  const handleEdit = (index) => {
    setTodo(todos[index]);
    setEditingIndex(index);
  }

  return (<>
      <div className="App">
        <h1>Hello world</h1>
        <div className='container'> Bài tập ToDoList </div>
        <input type="text" placeholder='Thêm công việc' value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button onClick={() => addTodo()}>{editingIndex !== null ? 'Lưu' : 'Thêm'}</button>
      </div>
      <div>
        {

          todos.map((todo, index) => {
            return (
              <div style={{'color': 'blue', 'fontSize': '20px', 'marginLeft': '20px', 'display': 'flex', 'justifyContent': 'space-between'}} key={index}>
                <p>{todo}</p>
                <button onClick={() => deleteTodo(index)}>Xóa</button>
                <button  onClick={()=> handleEdit(index)}>Sửa</button>
              </div>
            )
          })
        }
      </div>
    <ToastContainer />
  </>
  );
}

export default App;
