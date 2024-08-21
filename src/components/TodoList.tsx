import React, { useEffect, useState } from 'react';
import { fetchList } from '../api/api';
import { saveList,editTodo,deleteTodo } from '../api/api';
import toast, { Toaster } from "react-hot-toast";


interface Todo {
  name: string;
  isComplete: boolean;
  id:number;
}

export const TodoList: React.FC = () => {
  const [listTodo, setList] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEdit] = useState<number | undefined>();
  const [inputEdit, setinputEdit] = useState("");

  
  
  const date = new Date()
  const getList = async () => {
    try {
      const list = await fetchList();
      setList(list);
    } catch (error) {
      console.error('Error fetching list:', error);
    }
  };

  const notify = () => toast('Here is your toast.');
  const saveTodo=()=> {
    saveList(todo)
    notify()

      

  }
  const editTodoList=(id:number)=> {
    console.log('id editable',id)
    setEdit(id)
    setIsEdit(true);
    getList();
  

    
  }
  const updateTodo=(id:number,inputEdit:string)=> {
    console.log('id editable',id)
     setIsEdit(false);
      editTodo(inputEdit,id)

    
  }

  const deleteTodoList=(id:number)=> {
    console.log('id a eliminar',id)
    deleteTodo(id)

    
  }
  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTodo(event.target.value);
  };


  useEffect(() => {
    getList();
  }, [todo,listTodo]);

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card" id="list1" style={{ borderRadius: '.75rem', backgroundColor: '#eff1f2' }}>
              <div className="card-body py-4 px-4 px-md-5">
                <p className="h1 text-center mt-3 mb-4 pb-3 ">
                  <i className="fas fa-check-square me-1"></i>
                  <h1>Hi! Yesica</h1>
                  <u>My Todo-s</u>
                </p>

                <div className="pb-2">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-row align-items-center">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="exampleFormControlInput1"
                          placeholder="Add new..."
                          value={todo}
                          onChange={handleInputChange}
                        />
                        <a href="#!" title="Set due date">
                          <i className="fas fa-calendar-alt fa-lg me-3"></i>
                        </a>
                        <div>
                          <button type="button" className="btn btn-primary btn-lg" onClick={saveTodo}>
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                  <p className="small mb-0 me-2 text-muted">Filter</p>
                  <select>
                    <option value="1">All</option>
                    <option value="2">Completed</option>
                    <option value="3">Active</option>
                    <option value="4">Has due date</option>
                  </select>
                  <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
                  <select>
                    <option value="1">Added date</option>
                    <option value="2">Due date</option>
                  </select>
                  <a href="#!" style={{ color: '#23af89' }} title="Ascending">
                    <i className="fas fa-sort-amount-down-alt ms-2"></i>
                  </a>
                </div>

                
                {listTodo.length === 0 ? (
                  <p className="text-center">No todos available</p>
                ) : (
                  listTodo.map((todo, index) => (
                    <ul className="list-group list-group-horizontal rounded-0 bg-transparent" key={index}>
                      <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                        <div className="form-check">
                          <input
                            className="form-check-input me-0"
                            type="checkbox"
                            value=""
                            id={`flexCheckChecked${index}`}
                            aria-label="..."
                            checked={todo.isComplete}
                            readOnly
                          />
                        </div>
                      </li>
                      {/* <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                       
                        {isEdit === true && todo ?
                       (<input value={todo.name}></input>) :(<p className="lead fw-normal mb-0">{todo.name}</p>) }

                      </li> */}
                       <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                        {editId === todo.id && isEdit===true ? (
                          <>
                            <input
                              value={inputEdit}
                              onChange={(e) => setinputEdit(e.target.value)}
                            />
                            <button className="btn btn-primary ms-2" onClick={() => updateTodo(todo.id,inputEdit)}>
                              Save
                            </button>
                            <button className="btn btn-secondary ms-2" onClick={() => setEdit(undefined)}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <p className="lead fw-normal mb-0">{todo.name}</p>
                        )}
                      </li>
                      <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                        <div className="d-flex flex-row justify-content-end mb-1">
                         
                          <button className="btn btn-secondary " onClick={()=>{editTodoList(todo.id)}} > Edit</button>
                          <div > <button className="btn btn-danger" onClick={()=>{deleteTodoList(todo.id)}}  style={{marginLeft:"3px"}}>Delete </button></div>
                         
                  
                        </div>
                        <div className="text-end text-muted">
                          <a href="#!" className="text-muted" title="Created date">
                            <p className="small mb-0">
                              <i className="fas fa-info-circle me-2"></i>{date.toDateString()}
                            </p>
                          </a>
                        </div>
                      </li>
                    </ul>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
