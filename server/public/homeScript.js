class Validator {
    static isEmpty(id){
        
    
        if($.trim($(id).val()).length == 0){
            return true;
        }
        return false;
    }
}

$("#btnLogOut").click(logOut);


async function  generateTasks(){
    try{
        const response = await fetch('http://localhost:3000/tasks', {
            method:'GET',
            credentials: 'include'
        })
        if(response.ok){
            const responseJson = await response.json();
            const formAddTask = `
            <div class='card mr-1 mt-3 mb-3 col-sm-4'>
            <form class="TaskAddForm">
            <div class='card-header d-flex justify-content-between align-items-center'>
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
            </div>
    
        </div>
            
            `
             $("#taskDump").append(formAddTask)
             $("#btnAddTask").click(addTask);

            responseJson.forEach(element => { 
                const content = `
                <div class='card taskDiv mt-3 mb-3 col-sm-4'>
                    <div class='card-header'>#${element.dueDate}</div>
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
        }
        catch(err){
            console.log(err);
        }

        $("#txtAddDueDate").val("");
        $("#txtAddTitle").val("");
        $("#txtAddDesc").val("");
        generateTasks();
        $("#taskDump").html("")
    }
    else {
        alert("Please fill all fields");
    }
}


generateTasks()

