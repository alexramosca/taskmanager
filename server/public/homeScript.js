async function  generateTasks(){
    try{
        const response = await fetch('http://localhost:3000/tasks', {
            method:'GET',
            credentials: 'include'
        })
         const responseJson = await response.json();

        responseJson.forEach(element => {
            
            const content = `<div class='row bottom-border'>
                <div class='col'>${element.taskId}</div>
                <div class='col'>${element.title}</div>
                <div class='col'>${element.description}</div>
                <div class='col'>${element.status}</div>
                <div class='col'>${element.dueDate}</div>
            </div>
            `
             
             $("#taskDump").append(content);
        });
    }
    catch(err){
        console.log(err);
    }
}

generateTasks()