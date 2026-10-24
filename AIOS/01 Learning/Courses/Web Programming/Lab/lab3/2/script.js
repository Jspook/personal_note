function generateNumbers(){
    const container = document.getElementById("display");
    container.innerHTML = "";
    for (let i = 0; i < 6; i++){
        const randomNum = Math.floor(Math.random()*10);
        const img = document.createElement("img");
        img.src = randomNum + ".png";
        img.alt = randomNum;
        container.appendChild(img)
    }
}