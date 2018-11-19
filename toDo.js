"use strict";

  function init()
  {
   storageStore('toDo', JSON.stringify([]));
  
   return;
  }
  
  function main(input)
  {
     

    const toDoStorage = storageLoad('toDo');
    let para = JSON.parse(input);
    let task = para.params;
    let toDo = JSON.parse(toDoStorage);

    if (para.method === 'add' ) {
     toDo.push(task);
    }else if (para.method === 'done'){
      let i = 0; 
      for (i = 0; i < toDo.length; i+=1) {
        if (toDo[i].desc === task.desc){
          toDo[i].completed = true;
        }
      }
    }
    storageStore('toDo', JSON.stringify(toDo));
   }

  function query()
  { 
   let result = {};
   
   result.toDo = storageLoad('toDo');
   return JSON.stringify(result);
  
  }