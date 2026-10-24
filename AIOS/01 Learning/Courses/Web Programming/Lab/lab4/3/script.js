let money = 0;
const display_balance = document.getElementById("display_balance");
const display_table = document.getElementById("display_table");
const addButton = document.getElementById("Add");

const table = document.createElement("table");
const thead = document.createElement("thead");
const headerRow = document.createElement("tr");
const tableBody = document.createElement("tbody");
tableBody.id = "table_body";

["วันที่", "รายการ", "รายรับ", "รายจ่าย"].forEach(function (title) {
  const th = document.createElement("th");
  th.textContent = title;
  headerRow.appendChild(th);
});

thead.appendChild(headerRow);
table.append(thead, tableBody);
display_table.appendChild(table);

function updateBalance() {
  const heading = document.createElement("h1");
  heading.textContent = `฿${money.toLocaleString()}`;
  display_balance.replaceChildren(heading);
}

updateBalance();

addButton.addEventListener("click", function () {
  const list = document.getElementById("list").value;
  const amountNum = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;
  const type = document.getElementById("typeSelect").value;

  if (!list || isNaN(amountNum) || !date) {
    alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
    return;
  }

  const row = document.createElement("tr");
  const dateCell = document.createElement("td");
  const listCell = document.createElement("td");
  const incomeCell = document.createElement("td");
  const expenseCell = document.createElement("td");

  dateCell.textContent = date;
  listCell.textContent = list;

  if (type === "expense") {
    incomeCell.textContent = "0";
    expenseCell.textContent = amountNum;
    money -= amountNum;
  } else if (type === "income") {
    incomeCell.textContent = amountNum;
    expenseCell.textContent = "0";
    money += amountNum;
  }

  row.append(dateCell, listCell, incomeCell, expenseCell);
  tableBody.appendChild(row);

  updateBalance();

  document.getElementById("list").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
});