const dictionaryForm = document.getElementById("dictionaryForm");
const wordInput = document.getElementById("word");
const definitionInput = document.getElementById("definition");

const listContainer = document.getElementById("dictionaryList");


// อ่านข้อมูลจาก LocalStorage
let vocabularies = JSON.parse(localStorage.getItem("vocabularies")) || [];

// แสดงข้อมูลเมื่อเปิดเว็บไซต์
displayVocabulary();

// เพิ่มคำศัพท์
dictionaryForm.addEventListener("submit", function(event) {

    // ป้องกัน Form refresh หน้า
    event.preventDefault();
    const word = wordInput.value.trim();
    const definition = definitionInput.value.trim();

    // สร้าง Object ใหม่
    const newVocab = {
        id: Date.now(),
        word: word,
        meaning: definition
    };

    // เพิ่มข้อมูลเข้า Array
    vocabularies.push(newVocab);
    // บันทึกลง LocalStorage
    localStorage.setItem("vocabularies",JSON.stringify(vocabularies));
    // แสดงข้อมูลใหม่
    displayVocabulary();

    // ล้างช่อง Input
    wordInput.value = "";
    definitionInput.value = "";

});


// แสดงรายการคำศัพท์
function displayVocabulary() {

    // ล้างรายการเดิม
    while (listContainer.firstChild) {

        listContainer.removeChild(
            listContainer.firstChild
        );

    }


    // ถ้าไม่มีข้อมูล
    if (vocabularies.length === 0) {

        const emptyP =
            document.createElement("p");

        emptyP.append(
            "No vocabularies found."
        );

        listContainer.append(emptyP);

        return;
    }


    // Container ของรายการ
    const displayContainer = document.createElement("div");

    displayContainer.classList.add("vocabulary-list");

    // วนข้อมูลทุกคำ
    vocabularies.forEach(function(vocab) {
        const vocabulary = document.createElement("div");
        vocabulary.classList.add( "vocabulary-item" );

        // ส่วนของคำศัพท์
        const content = document.createElement("div");

        content.classList.add("vocabulary-content");


        // Word
        const wordElement = document.createElement("div");
        wordElement.classList.add("word");
        wordElement.append(vocab.word);

        // Meaning
        const meaningElement = document.createElement("div");

        meaningElement.classList.add("meaning");

        meaningElement.append(vocab.meaning);


        // เพิ่ม Word + Meaning
        content.append(wordElement,meaningElement);

        // ปุ่มลบ
        const deleteButton = document.createElement("button");

        deleteButton.classList.add("btn","btn-delete");
        deleteButton.append("ลบ");

        // Event ปุ่มลบ
        deleteButton.addEventListener("click",function() {
                deleteVocabulary(vocab.id);
            });

        // เพิ่มทุกอย่างเข้า vocabulary
        vocabulary.append(content,deleteButton);
        // เพิ่ม vocabulary เข้า list
        displayContainer.append(vocabulary);

    });


    // เพิ่ม list เข้า HTML
    listContainer.append(displayContainer);

}

// ลบคำศัพท์
function deleteVocabulary(id) {
    vocabularies = vocabularies.filter(function(vocab) {
        return vocab.id !== id;
    });

    // Update LocalStorage
    localStorage.setItem("vocabularies",JSON.stringify(vocabularies));
    // แสดงข้อมูลใหม่
    displayVocabulary();

}