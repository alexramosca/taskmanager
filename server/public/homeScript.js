class Validator {
    static isEmpty(id){
        
    
        if($.trim($(id).val()).length == 0){
            return true;
        }
        return false;
    }
}

//events listeners
$("#btnLogOut").click(logOut);





function enableTaskCreator(){
    //it's placed here to keep track of the enter button only when the form is enabled
    $(document).on("keydown", (e)=>{
        if(e.keyCode === 13 || e.which == 13){
            addTask()
        }
    })
    const content = `
    <form  class="TaskAddForm col-5 card ">
    <div class='card-header pointer bg-white d-flex justify-content-between align-items-center'>
        <svg id="btnAddTask" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
        <input type="date" id="txtAddDueDate" class="form-control" placeholder="Due date"></div>
    <div class='card-body'>
        
        <h5 class="card-title form-control">
            <input id="txtAddTitle" class="form-control" type="text" placeholder="Title"></h5>
        <p class="card-text form-control">
            <input id="txtAddDesc" class="form-control" type="text" placeholder="Description"></p>
        </form>
    `
    $("#divBtnAddTask").html(content)
    $("#taskCreator").removeClass("d-flex justify-content-center align-items-center")
    $("#taskCreator").addClass('card')
    $("#divBtnAddTask").off("click")
     $("#btnAddTask").click(addTask);
     $("#txtAddTitle").focus();
     
}
async function  generateTasks(){
    $("#taskDump").html("");
    try{
        const response = await fetch('http://localhost:3000/tasks', {
            method:'GET',
            credentials: 'include'
        })
        if(response.ok){
            const responseJson = await response.json();
            ///CREATES THE BUTTON TO ENABLE THE FORM TO ADD A NEW TASK
            const formAddTask = `
            <div id="taskCreator" class='mr-1 mt-3 mb-3 col-12 col-md-3 col-lg-2 pointer d-flex justify-content-center align-items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                </svg>
            </div>
    
        </div>
            
            `
            
             $("#divBtnAddTask").html(formAddTask)
             $("#divBtnAddTask").click(enableTaskCreator);
             
             if($("#taskCreator")){
                $(document).off('keydown');
                $(document).one('keyup', (e)=>{
                    if(e.keyCode === 13 ||e.which == 13){
                        enableTaskCreator();

                       
                    } 
                })
             }
             
             

             let colorCard = "";

            /////////////CREATES THE TASKS STORED IN THE DATABASE
            responseJson.forEach(element => { 
                if(element.status === 'In-Progress'){
                    colorCard = 'bg-warning';
                }
                else if (element.status === 'Done'){
                    colorCard = 'bg-success';
                }
                else {
                    colorCard = 'bg-danger'
                }
                const content = `
                
                <div class='card taskDiv text-center mx-2 my-2 col-12 col-md-3 '>
                    
                        <div class='card-header ${colorCard} text-white d-flex justify-content-between align-items-center'>
                            <span class="date">${element.dueDate}</span>


                            <div>
                                
                                <svg onclick="finishTask(${element.taskId})" class="pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                                <svg onclick="deleteTask(${element.taskId})" class="pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                            </div>
                        </div>
                        
                    
                    <div class='card-body'>
                        
                         <h5 class="card-title">${element.title}</h5>
                         <p class="card-text">${element.description}</p>

                    </div>
            
                </div>
                
                `
                 $("#taskDump").append(content);
            });
    
        } 
      
    }
    catch(err){
        console.log(err);
    }
}
async function logOut(){
    const response = await fetch('http://localhost:3000/users/logout', {
        method: 'GET',
        credentials : "include"
    })
    if (response.ok) {
        window.location.href = "/login.html"
    }
}

async function addTask(){
        if(!Validator.isEmpty('#txtAddDueDate') &&
        !Validator.isEmpty('#txtAddTitle') &&
        !Validator.isEmpty('#txtAddDesc')){
        const dueDate = $("#txtAddDueDate").val();
        const title = $("#txtAddTitle").val();
        const description = $("#txtAddDesc").val();

        const data = {
            title: title,
            description: description,
            dueDate: dueDate
        }

        try{
            const insertTask = await fetch('http://localhost:3000/tasks/create', {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(data)
            })
            if(!insertTask.ok){
                const error = await insertTask.json()
                alert(error.message);
                $("#txtAddDueDate").focus()
                return false
            }
            else {
                $("#txtAddDueDate").val("");
                $("#txtAddTitle").val("");
                $("#txtAddDesc").val("");
                generateTasks();
                return true;
            }
        }
        catch(err){
            console.log(err);
        }

       
    }
    else {
        alert("Please fill all fields");
    }
}

async function deleteTask(taskId){
    
    try{
        const data = {
            taskId: taskId
        }
        const deleteTask = await fetch('http://localhost:3000/tasks/delete', {
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(data)
        })
        if(deleteTask.ok){
            generateTasks();
        }
    }
    catch(err){
        console.log(err)
    }
}

async function finishTask(taskId){
    try{
        const data = {
            taskId: taskId
        }
        const deleteTask = await fetch('http://localhost:3000/tasks/done', {
            method: 'PATCH',
            headers:{'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(data)
        })
        if(deleteTask.ok){
            generateTasks();
        }
    }
    catch(err){
        console.log(err)
    }
}


generateTasks()



