class Utilities {
    static ConnectClickTaskId(control, action, taskId, mode){
       
            control.click(()=>{
                if(mode)
                    action(taskId, mode)
                else
                    action(taskId)
            })
        
    }
    static clearControls(...ids){
       
        ids.forEach((element)=>{
            $(`#${element}`).val("")
        })
    }
    static clearTags(...ids){
        ids.forEach((element)=>{
            $(`#${element}`).html("")
        })
    }
}


export default Utilities