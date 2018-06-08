var taskslist = {
    tasks : [] ,
    addTasks : function(taskElement,dateElement){
        this.tasks.push({
            name: taskElement.value,
            date: dateElement.value,
            status: false
        });
        view.displayTasks(taskslist.tasks);
    },
    
    deleteByIndex : function (index){
        console.log(index);
        taskslist.tasks.splice(index,1);
        console.log(taskslist.tasks[index]);
    },
     
    changeStatusByIndex : function (index){
        console.log(index);
        taskslist.tasks[index].status = !taskslist.tasks[index].status;
        console.log(taskslist.tasks[index]);
    
    }
    
    
}

var handler = {
    
    add : function (){
        var taskElement = document.getElementById("taskname");
        var dateElement = document.getElementById("taskdate");
        if(taskElement.value === "" || dateElement.value === ""){
            alert("Task can not be empty ")
        }
        else{
        taskslist.addTasks(taskElement,dateElement);
        }
    },
    
    delete : function () {
     var checkboxes = document.getElementsByName("chkbx");
     for (index = checkboxes.length-1 ; index > -1 ; index--){
         if(checkboxes[index].checked){
            taskslist.deleteByIndex(index);
         }}
        view.displayTasks(taskslist.tasks);
    },
    
    filterTasks : function (){
        var filterElement = document.getElementById("filterOption");
        console.log(filterElement.value);
        if(filterElement.value === "IN-PROGRESS"){
           var tasks = taskslist.tasks.filter(checkTasksInProgress);
            view.displayTasks(tasks);
        }
        if(filterElement.value === "COMPLETED"){
           var tasks = taskslist.tasks.filter(checkTasksCompleted);
            view.displayTasks(tasks);
        }
        if(filterElement.value === "ALL"){
            view.displayTasks(taskslist.tasks);
        }
        function checkTasksCompleted(task) {
            return task.status==true ;
        }
        function checkTasksInProgress(task) {
            return task.status==false ;
        }
    },
    
    
    changeStatus : function (){
    var checkboxes = document.getElementsByName("chkbx");
     for (index = 0 ; index<checkboxes.length ; index ++){
         if(checkboxes[index].checked){
            taskslist.changeStatusByIndex(index);
         }}
        view.displayTasks(taskslist.tasks);
    },
    
    
    multiSelect: function (){
        var checkboxes = document.getElementsByName("chkbx");
        var multiselectCheck = document.getElementById("multipleSelect");
       if(multiselectCheck.checked){
        for (index = checkboxes.length-1 ; index > -1 ; index--){
                checkboxes[index].checked = true;
            }
       }
        else{
            for (index = checkboxes.length-1 ; index > -1 ; index--){
                checkboxes[index].checked = false;
            }
        }
            
    }  
}

var view = {
    displayTasks : function (tasks){
        console.log(tasks);
        var viewElement =  document.getElementById("tasksview");
        viewElement.innerHTML="";
        viewElement = this.createTableHeader(viewElement);
        var index=0;
        var taskArray = tasks;
        console.log(taskArray);
      
        for(index=0;index<taskArray.length;index++){
            var tr = document.createElement("tr");
            var checkbox = view.createCheckBox();
            checkbox.setAttribute("id",index);
            checkbox.setAttribute("name","chkbx");
            var checkBoxElement = document.createElement("td");
            checkBoxElement.appendChild(checkbox);
            var titleElement = document.createElement("td");
            titleElement.append(taskArray[index].name);
            var dateElement = document.createElement("td");
            var taskDueStatus = this.findTaskStatus(taskArray[index].date);
            dateElement.append(taskDueStatus);
            var statusElement = document.createElement("td");
            var taskStatus = this.completeStatus(taskArray[index].status);
            statusElement.append(taskStatus);
            tr.appendChild(checkBoxElement);
            tr.appendChild(titleElement);
            tr.appendChild(dateElement);
            tr.appendChild(statusElement);
            viewElement.appendChild(tr);
        }      
        console.log(viewElement)
    },
    
    
    findTaskStatus : function (input) {
        var inputDate = new Date(input);
        var currentDate = new Date();
        var message ="";
        console.log(currentDate+" "+currentDate.getTime()+inputDate+" "+inputDate.getTime());

        if(inputDate.getDate() === currentDate.getDate()){
            message = "Due Today";
        }else if(inputDate.getTime() > currentDate.getTime()){
            var daysLeft = inputDate.getDate() - currentDate.getDate();
            message = daysLeft+" Days Due";
        }else{
            message = "OverDue";
        }
    return message;

    },
    
    completeStatus : function(status){
        var message = "";
        if(status == false){
            message = "In Progress";
        }
        else{
            message = "Completed";
        }
        return message ;
    },
    
    createTableHeader : function (viewElement){
        var tableHeader = document.createElement("tr");
        var checkbox = view.createCheckBox();
        checkbox.setAttribute("id","multipleSelect");
        checkbox.setAttribute("onclick","handler.multiSelect()");
        var checkBoxElement = document.createElement("td");
        checkBoxElement.appendChild(checkbox);
        var titleElement = document.createElement("td");
        titleElement.append("TITLE");
        var dateElement = document.createElement("td");
        dateElement.append("DUE DATE");
        var statusElement = document.createElement("td");
        statusElement.append("STATUS");
        tableHeader.appendChild(checkBoxElement);
        tableHeader.appendChild(titleElement);
        tableHeader.appendChild(dateElement);
        tableHeader.appendChild(statusElement);        
        viewElement.appendChild(tableHeader);
        return viewElement;
    },
    
    createCheckBox : function (){
    var checkBoxElement = document.createElement("input");
    checkBoxElement.type="checkbox";
    return checkBoxElement;
    }
}
