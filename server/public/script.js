$(function() {
    //this function takes care of the submit event listener when the page load| LOGIN PAGE
    $("#loginForm").submit(function(event){
        event.preventDefault();
        login()
    })
    
    $("#signForm").submit((event)=>{
        event.preventDefault();
        signUp()
    })


  });


  async function signUp(){
    let name = $("#txtSname").val();
    let email = $("#txtSemail").val();
    let username = $("#txtSusername").val();
    let password = $("#txtSpassword").val();

    const data = {
        name: name,
        email: email,
        username: username,
        password: password
      }

      try{
        const response = await fetch('http://localhost:3000/users/register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        console.log(response)
        if(response.ok){
            alert("Account created successfully")
            window.location.href = '/login.html'
        }
        else alert("Please, try again") ////////SANATIZE DATA
      }
      catch(err){
        alert("Somenthing went wrong" + " " + err)
      }
  }
  

  
  async function login(){
    let username = $("#txtUsername").val();
    let password = $("#txtPassword").val();
    const data = {
        username: username,
        password: password
    }
    
    try{
        const response = await fetch('http://localhost:3000/users/login', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })

        if(response.ok){
            window.location.href = '/home.html'
        }
        else {
            alert("failed")
        }
    }
    catch(err){
        console.log(err);
    }
    

  }