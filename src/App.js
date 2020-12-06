import React, {useState} from 'react'
import './App.css';

function App() {

const [todo, setTodo] = useState('');
const [category, setCategory] = useState('Other')
const [todoList, setTodoList] = useState([]);
const [filtered, setFiltered] = useState([]);
const [isClicked, setIsClicked] = useState(false)

function handleSubmit(ev){
  setTodo(ev.target.value)
}

function handleSelect(ev){
  setCategory(ev.target.value)
}

function addItem(){
  setTodoList(prev=>{
    return [...prev,{name: todo, category: category}]
  })
  setTodo('')
}
//delete
function deleteTodo(key){
  setTodoList(prev=>{
    return prev.filter((item,i)=>{
      return i !== key
    })
  })

  setFiltered(prev=>{
    return prev.filter((item,i)=>{
      return i !== key
    })
  })
  
}
//filter
function filterTodo(categ){
  setIsClicked(true)
   setFiltered(todoList.filter(item=>{
    return item.category === categ
   }))


}
//show All
function showAll(){
  setFiltered(todoList)
}


  return (
    <div className="App">
     <input value={todo} placeholder='add text here...' type='text' onChange={handleSubmit}/>
     <select onChange={handleSelect}>
       <option value='Other'>Other</option>
       <option value='Coding'>Coding</option>
       <option value='Sports'>Sports</option>
       <option value='Food'>Food</option>
     </select>
     <button onClick={addItem}>Submit</button>
     {
       todoList.length > 0 && !isClicked
      ? 
        todoList.map((item,i)=>{
          return(
            <div>
            <p key={i}>{item.name} || {item.category}</p><button onClick={()=>deleteTodo(i)}>X</button>
            </div>
          ) 
          
       })
      
      : isClicked ?
       
       filtered.map((item,i)=>{
        return(
            <div>
            <p key={i}>{item.name} || {item.category}</p><button onClick={()=>deleteTodo(i)}>X</button>
            </div>
          )  
       })
      : <p>You have nothing to do</p>
     }

     <div className='categories'>
       <h2>Categories:</h2>
       <p onClick={()=>filterTodo('Other')}>Other</p>
       <p onClick={()=>filterTodo('Coding')}>Coding</p>
       <p onClick={()=>filterTodo('Sports')}>Sports</p>
       <p onClick={()=>filterTodo('Food')}>Food</p>
       <p onClick={showAll}>All</p>
            
     </div>
    </div>
  );
}

export default App;
