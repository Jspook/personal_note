const table = document.getElementById("main-table")
let data = []

async function loaddata() {
    const res = await fetch("songs.json");
    const song = await res.json()
    data = song.songs
    createTable()
}

function createTable(){
    const tbody = document.createElement("tbody")
    const thead = document.createElement("thead")

    const headerrow = document.createElement('tr')
    const id = document.createElement("th")
    id.textContent = "ID"

    const title = document.createElement("th")
    title.textContent = "Title"

    const artist = document.createElement("th")
    artist.textContent = "Artist"

    const album = document.createElement("th")
    album.textContent = "Album"

    const release_year = document.createElement("th")
    release_year.textContent = "Release Year"

    const label = document.createElement("th")
    label.textContent = "Label"

    headerrow.append(id,title,artist,album,release_year,label)
    thead.appendChild(headerrow)

    data.forEach((song) =>{
        createSection(song,tbody)
    });

    table.replaceChildren(thead, tbody);
}

function createSection(data,tbody){

    const row = document.createElement("tr")

    const id = document.createElement("td")
    id.textContent = data.id

    const title = document.createElement("td")
    title.textContent = data.title

    const artist = document.createElement("td")
    artist.textContent = data.artist

    const album = document.createElement("td")
    album.textContent = data.album

    const release_year = document.createElement("td")
    release_year.textContent = data.release_year

    const label = document.createElement("td")
    label.textContent = data.label

    row.append(id,title,artist,album,release_year,label)
    tbody.appendChild(row)
}

loaddata();