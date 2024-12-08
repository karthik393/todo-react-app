import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("");
  
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const handleAdd = ()=> {
     setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}]) 

    //  spread operator and terenary opr used above

     setTodo("")
     console.log(todos);
     saveLocalStorage()
  }

  const handleEdit = (e, id)=> {
    let t = todos.filter(i=>i.id === id)

  //  the filter method used in here is to create a new array 't' that contains all elements in todos that also meet a condition
  // the i.id === id is used to check if id of each todO object 'i.id' is equal to givEn id
  //  (t) is an array of todos where the id matches the given id. Since id is typically unique, t will usually have only one element.

    setTodo(t[0].todo)

    let newTodos = todos.filter(item =>{
      return item.id!==id
    });

    setTodos(newTodos)
    saveLocalStorage()
  }

  const handleDelete = (e, id)=>{
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    
    let newTodos = todos.filter(item =>{
      return item.id!==id
    });

    //  if this is true the item is included if it is not it's removed "meaning if the id matches the id we want to remove"
    // ==	equal to ===	equal value and equal type !=	not equal !==	not equal value or not equal type

    setTodos(newTodos)
    saveLocalStorage()
  }

  const handleChange = (e)=> {
    event.target.value
    // to know what's written in the input
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {
    let id = e.target.name;
    // name is a property for checkbox element and also that contains an id

    let index = todos.findIndex(item=>{
      return item.id === id;
    })

    // findindex is used to find the index of a array and id = id and all this is stored in the index var

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted

    // todo of index is toggled If it was true it becomes false and vice versa.
    // The ! operator in JavaScript is the logical NOT operator. It is used to invert the truth of a value.

    setTodos(newTodos)
    saveLocalStorage()
  }

  return (
    <>
    <Navbar/>
          
      <div className="conatiner bg-white">

      <div className='container mx-auto my-5 rounded-xl p-4 bg-violet-300 h-screen w-1/2 lg:min-h-fit'>
      
      <h1 className='font-bold text-2xl text-center'>KG Todo - manage your todos at one place</h1>

      <div className="addtodo">

        <h1 className='text-xl font-semibold my-2 mr-10 text-center py-2'>Add A Todo</h1>

        <input onChange={handleChange} value={todo} type="text" className='w-4/5 my-3 rounded-lg'/>

        {/* react forms used here onchange knowing whats written in the input */}

        <button onClick={handleAdd} disabled={todo.length <= 1} className='bg-custom-orange hover:bg-custom-bg-orange text-white p-3 py-1 rounded-md mx-2'>Add</button>
      </div>

        <h1 className='text-xl font-semibold my-3'>Your Todos</h1>
        <div className="todos">
         {todos.map(item=>{

            {/* react map used here the map function loops through the array of todos for every single item in that array it passes the todo */}
        return <div key={item.id} className='todo flex w-1/2 justify-between my-3 text-xl'>
           
          <input name={item.id}  type="checkbox" onChange={handleCheckBox} checked={item.isCompleted}  id=""/>

          <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
          {/* ternary ops used above */}

          <div className="buttons flex h-full">
            <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-custom-orange hover:bg-custom-bg-orange text-white p-3 py-1 rounded-md mx-1'><MdEdit />
</button>
            <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-custom-orange hover:bg-custom-bg-orange text-white p-3 py-1 rounded-md mx-1'><MdOutlineDeleteForever />
</button>
            {/* the delete func above takes 2 parameters for argument e and item.id this is the specifc id of todo "" to be delted when clicked*/}
          </div>
        </div>
        })}
        </div>
      </div>
      </div>
    </>
  )
}

export default App
