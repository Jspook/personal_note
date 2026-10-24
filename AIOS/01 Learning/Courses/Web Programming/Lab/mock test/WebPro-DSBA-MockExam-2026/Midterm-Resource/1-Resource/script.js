const table_main = document.getElementById("table_main");
let data = []

async function loaddata(){
    const reponse = await fetch("employees.json");
    const json = await reponse.json();
    data = json.employees
    createTable(data)
}

function createTable(){
    const thead =  document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headerow = document.createElement("tr");
    
    const th1 = document.createElement("th");
    th1.textContent = "ID";
    const th2 = document.createElement("th");
    th2.textContent = "Name";
    const th3 = document.createElement("th");
    th3.textContent = "Gender";
    const th4 = document.createElement("th");
    th4.textContent = "Position";
    const th5 = document.createElement("th");
    th5.textContent = "Address";

    headerow.append(th1,th2,th3,th4,th5)
    thead.appendChild(headerow)
    table_main.appendChild(thead)

    data.forEach((employee) => {
        createSection(employee,tbody);
    })

    table_main.appendChild(tbody)
}

function createSection(employee , tbody){
    const datarow = document.createElement("tr")
    
    const id = document.createElement("td");
    id.textContent = employee.id

    const name = document.createElement("td");
    name.textContent = `${employee.FirstName} ${employee.LastName}`

    const gender = document.createElement("td");
    gender.textContent = employee.Gender

    const position = document.createElement("td");
    position.textContent = employee.Position

    const address = document.createElement("td");
    address.textContent = employee.Address

    datarow.append(id,name,gender,position,address)
    tbody.appendChild(datarow)

}

loaddata();