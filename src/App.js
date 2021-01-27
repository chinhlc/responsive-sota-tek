import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [startTime, setStartTime] = useState(0);
  const [listCollapse, setListCollapse] = useState({});

  const [listTask, setListTask] = useState([]);
  const [listTaskUpdate, setListTaskUpdate] = useState({});
  const [itemTask, setItemTask] = useState({piority: "normal"});

  useEffect(() => {
    let today = new Date(),
    dateNow = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);
    setStartTime(dateNow)
    setItemTask({...itemTask, date: dateNow})
  }, []);

  const AddNewTask = () => {
    let taskItem = {...itemTask, id: listTask.length + 1}
    let taskList = [...listTask, taskItem];
    let dataSort = taskList.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));

    setListTask([...dataSort]);
    setItemTask({piority: "normal"});
  }

  const updateListCollapse = (idData) => {
      setListCollapse({...listCollapse, [idData]: listCollapse[idData]? !listCollapse[idData] : true})
  }

  console.log("haha ", listCollapse);

  const onChangeUpdate = (index, idData, fieldName, valueData) => {
    const dataDefault = listTaskUpdate[idData]? listTaskUpdate[idData] : listTask[index];
    listTaskUpdate[idData] = {...dataDefault, [fieldName]: valueData}
    setListTaskUpdate({...listTaskUpdate});
  }

  const UpdateTask = (index, idData, listData) => {
    listTask[idData]= listData[index];
    setListTask([...listTask]);
  }

  const itemContent = () => {
    return listTask.map((data, index) => (
      <div className="task-item" key={data.id}>
        {console.log("xem nao ", listTaskUpdate)}
        <div className="task-item__info d-flex">
          <div className="d-flex">
            <input type="checkbox" id="item1" name="item1" value="item1"/>
            <label htmlFor="item1"> {data.title}</label>
          </div>
          <div className="d-flex">
            <div className="p-2">
              <button className="button-blue" onClick={()=>updateListCollapse(data.id)}>Detail</button>
            </div>
            <div className="p-2">
              <button className="button-red">Remove</button>
            </div>
          </div>
        </div>
        <div className={`task-item__form ${listCollapse[data.id]? "d-block" : "d-none"}`}>
          <input className="form-control title-task" type="text"
                  value={listTaskUpdate[data.id]?.title? listTaskUpdate[data.id].title : data.title} 
                  onChange={(e)=> onChangeUpdate(index, data.id, "title", e.target.value)} />
          <p><strong>Description</strong></p>
          <textarea className="form-control description-task" rows="4"
                  value={listTaskUpdate[data.id]?.description? listTaskUpdate[data.id]?.description : data.description} 
                  onChange={(e)=> onChangeUpdate(index, data.id, "description", e.target.value)} />
          <div className="row">
            <div className="col w-100">
              <p><strong>Due Date</strong></p>
              <input className="form-control" type="date" min={startTime} max="2030-12-31"
                  value={listTaskUpdate[data.id]?.date? listTaskUpdate[data.id].date : data.date} 
                  onChange={(e)=> onChangeUpdate(index, data.id, "date", e.target.value)}/>
            </div>
            <div className="col w-100">
              <p><strong>Piority</strong></p>
              <select className="form-control" name="cars" id="cars"
                value={listTaskUpdate[data.id]?.piority? listTaskUpdate[data.id].piority : data.piority} 
                onChange={(e)=> onChangeUpdate(index, data.id, "piority", e.target.value)}>
                    <option value="low">low</option>
                    <option value="normal">normal</option>
                    <option value="high">high</option>
                  </select>
            </div>
          </div>
          <div className="py-5">
            <button className="button-green" onClick={()=>UpdateTask(index, data.id, listTaskUpdate)}>Update</button>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <div className="container wrapper-screen">
        <div className="col block__left-side">
            <h2 className="text-center">New Task</h2>
            <div className="block-content">
              <input className="form-control title-task" type="text" placeholder="Add new task ..."
                        value={itemTask["title"]? itemTask.title: ""} 
                        onChange={(e)=>setItemTask({...itemTask, title: e.target.value})} />
              <p><strong>Description</strong></p>
              <textarea className="form-control description-task" rows="4" 
                        value={itemTask["description"]? itemTask.description: ""} 
                        onChange={(e)=>setItemTask({...itemTask, description: e.target.value})} />
              <div className="row">
                <div className="col w-100">
                  <p><strong>Due Date</strong></p>
                  <input className="form-control" type="date" min={startTime} max="2030-12-31" 
                        value={itemTask["date"]? itemTask.date: ""} 
                        onChange={(e)=>setItemTask({...itemTask, date: e.target.value})}/>
                </div>
                <div className="col w-100">
                  <p><strong>Piority</strong></p>
                  <select className="form-control"
                        value={itemTask["piority"]? itemTask.piority: "normal"} 
                        onChange={(e)=>setItemTask({...itemTask, piority: e.target.value})}>
                              <option value="low">low</option>
                              <option value="normal">normal</option>
                              <option value="high">high</option>
                  </select>
                </div>
              </div>
              <div className="py-5">
                <button className="button-green" onClick={()=>AddNewTask()}>add</button>
              </div>
            </div>
        </div>
        <div className="block__right-side">
          <div className="col">
            <h2 className="text-center">To Do List</h2>
            <div className="block-content">              
              <input className="form-control search-task" type="text" placeholder="Search..." />
              
              <div className="list-task">
                {listTask.length >0  && itemContent()}
              </div>

             </div>
            </div>
            <div className="bottom-action d-flex bg-gray mt-5">
              <div>Bulk Action</div>
              <div className="d-flex">
                <div className="p-2">
                  <button className="button-blue">Done</button>
                </div>
                <div className="p-2">
                  <button className="button-red">Remove</button>
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}

export default App;
