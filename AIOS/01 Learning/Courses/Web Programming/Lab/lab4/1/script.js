const numberInput = document.getElementById("numberInput")
const calculate = document.getElementById("calculate")
const Display = document.getElementById("Display")

calculate.addEventListener("click" , function(){
    const num = parseInt(numberInput.value);
    const htmlContent = document.createElement("table");
    const headerRow = document.createElement("tr");
    const header1 = document.createElement("th");
    const header2 = document.createElement("th");
    header1.textContent = "เลขคูณ";
    header2.textContent = "ผลลัพท์";
    headerRow.appendChild(header1);
    headerRow.appendChild(header2);
    htmlContent.appendChild(headerRow);
    for (let i = 1; i<=12; i++){
        const row = document.createElement("tr");
        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");
        const strong = document.createElement("strong");
    
        cell1.textContent = `${num} x ${i}`;
        strong.textContent = num * i;
        cell2.appendChild(strong);

        row.appendChild(cell1);
        row.appendChild(cell2);
        htmlContent.appendChild(row);
    }
    Display.replaceChildren(htmlContent);
})