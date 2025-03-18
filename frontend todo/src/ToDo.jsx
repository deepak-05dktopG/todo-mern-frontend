import React, { useState } from "react";


function ToDo() {
  const [toDo, setTodo] = useState("one of the");
  const [description, setDescription] = useState("most importnant perin ");
  const [list, setList] = useState([]);
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");

  const apiUrl="http://localhost:8000";

//   const apiUrl="http://localhost:3000";

  const handleSubmit = () => {
   if(toDo.trim() !=='' && description.trim() !== ''){
      fetch(apiUrl+"/todos",{
         method: "POST",
         headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
               "title": toDo,
               "description": description
               })
      })
      .then((res)=>{
         if(res.ok){
            setList([...list, {  toDo,  description }]);
            setSuccess("toDo added successfully")
         }
         else{
            setError("Error");
            console.log("error occured by:  ")
         }
      })
      setError("")
   }
   else{
   setError("Please fill all the fields");
   }
    setTodo("");
    setDescription("");
  };

  return (
    <div>
      <h1 className="text-center">Todo List</h1>
      <div className="form-group">
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={toDo}
          placeholder="todo"
          className="form"
        />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="description"
          className="form"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <ul>
        {list.map((item,index)=>(
         <li key={index}>
            {item.toDo} - {item.description}
         </li>
        ))}
      </ul>
      {error && <p className="text-danger">{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
}

export default ToDo;
