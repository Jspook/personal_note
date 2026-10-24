
const Firstname = document.getElementById("fname");
const Lastname = document.getElementById("lname");
const Address = document.getElementById("address");
const Phone = document.getElementById("phone");
const Job = document.getElementById("job");
const list_employees = document.getElementById("list_employees")

// อ่านข้อมูลจาก LocalStorage
let employees = JSON.parse(localStorage.getItem("employees")) || [];


document.getElementById("loginform").addEventListener("submit", function(event) {
    event.preventDefault()
    const name = `${Firstname.value.trim()} ${Lastname.value.trim()}`
    const address = Address.value.trim()
    const phone = Phone.value.trim()
    const job = Job.value.trim()
    const newemp = {
        id : Date.now(),
        name:name,
        address:address,
        phone:phone,
        job:job
    }

    employees.push(newemp)
    localStorage.setItem("employees",JSON.stringify(employees))

    Firstname.value = ""
    Lastname.value = ""
    Address.value = ""
    Phone.value = ""
    Job.value = ""
});

function displayemplyees(){
    while(list_employees.firstChild){
        list_employees.removeChild(list_employees.firstChild)
    }

    if (employees.length === 0){
        const empty = document.createElement("p")
        empty.textContent = "data not found"
        list_employees.appendChild(empty)
        return

    }

    const displayContainer = document.createElement("div");
    displayContainer.classList.add("employees-display");
        
    employees.forEach(function(data) {

        const employee = document.createElement("div");
        employee.classList.add("employee-item");

        const content = document.createElement("div");
        content.classList.add("employee-content");

        const nameElement = document.createElement("div");
        nameElement.classList.add("name");
        nameElement.append(data.name);

        const addressElement = document.createElement("div");
        addressElement.classList.add("address");
        addressElement.append(data.address);

        const phoneElement = document.createElement("div");
        phoneElement.classList.add("phone");
        phoneElement.append(data.phone);

        const jobElement = document.createElement("div");
        jobElement.classList.add("job");
        jobElement.append(data.job);

        content.append(nameElement, addressElement , phoneElement , jobElement);
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-delete");
        deleteButton.append("ลบ");
        deleteButton.addEventListener("click", function() {deleteemployee(data.id)});
        employee.append(content, deleteButton);
        displayContainer.append(employee);
    });
    
    list_employees.append(displayContainer);
}

function deleteemployee(id){
    employees = employees.filter(function(data){
        return data.id !==id;
    })

    localStorage.setItem("employees" ,JSON.stringify(employees));
    displayemplyees()
}

