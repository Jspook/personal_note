const mainContainer = document.getElementById("main-content");
let emp = [];

async function loademp() {

        const response = await fetch("employees.json");
        emp = await response.json();
        console.log(emp);
        createSections();

}

function createSections() {

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const tableBody = document.createElement("tbody");
    tableBody.id = "table_body";

    const th1 = document.createElement("th");
    th1.textContent = "ID";
    const th2 = document.createElement("th");
    th2.textContent = "Gender";
    const th3 = document.createElement("th");
    th3.textContent = "First Name";
    const th4 = document.createElement("th");
    th4.textContent = "Last Name";
    const th5 = document.createElement("th");
    th5.textContent = "Position";
    const th6 = document.createElement("th");
    th6.textContent = "Address";

    headerRow.append(th1, th2, th3, th4, th5 , th6);
    thead.appendChild(headerRow);
    table.append(thead, tableBody);
    mainContainer.appendChild(table);

    emp.forEach((employee) => {

        createSection(employee);

    });

}

function createSection(employee,index) {
    const tableBody = document.getElementById("table_body");
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = employee.id;
    const genderCell = document.createElement("td");
    genderCell.textContent = employee.Gender;
    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = employee.FirstName;
    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = employee.LastName;
    const positionCell = document.createElement("td");
    positionCell.textContent = employee.Position;
    const addressCell = document.createElement("td");
    addressCell.textContent = employee.Address;

    row.append(idCell, genderCell, firstNameCell, lastNameCell, positionCell, addressCell);
    tableBody.appendChild(row);
}

loademp();