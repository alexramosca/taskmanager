$(function() {
    //this function takes care of the submit event listener when the page load| LOGIN PAGE
    $("#loginForm").submit(function(event){
        event.preventDefault();
        login()
    })
    
    $("#signForm").submit((event)=>{
        event.preventDefault();
        const isValid = isSignValid();
        
        
        if(!isValid.isValid){
            const concString = isValid.errMsg.join(",")
             const errMsg = $("#errSmsg")
            errMsg.text(concString)
        }
        else
            signUp()
    })


  });


  function isSignValid(){
    let isValid= true;
    let errMsg = [];
    let email = $("#txtSemail").val()
    let password = $("#txtSpassword").val();
    let confirm = $("#txtSconfirm").val();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if(!emailRegex.test(email)){
        isValid = false;
        errMsg.push("Invalid format of email")
    }
    if(password.length < 6) {
        isValid = false;
        errMsg.push("password must have at least 6 characters")
    }
    if(password != confirm) {
        isValid = false;
        errMsg.push("password and confirmation don't match")
    }
    if(!isValid){
        return {isValid: isValid, errMsg: errMsg}
    }
    else 
        return {isValid: true, errMsg: ""}
    
  }

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
        jsonResponse = await response.json();
        console.log(jsonResponse)
        if(response.ok){
            alert("Account created successfully")
            window.location.href = '/login.html'
        }
        else {
            
            if(jsonResponse.error == "email"){
                $("#errSmsg").text(jsonResponse.message)
                $("#txtSemail").focus()
            }
            else if(jsonResponse.error == "email"){

                $("#txtSusername").focus()
            }
            $("#errSmsg").text(jsonResponse.message)

        }
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