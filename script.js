

const notesContainer = document.querySelector(".notes-container");
const createButton = document.querySelector(".btn");

// Sayfa açıldığında kaydedilen notları yükle
document.addEventListener("DOMContentLoaded", loadNotes);

createButton.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.innerText = "New note...";

    // Notlara çift tıklayınca silme özelliği ekle
    inputBox.addEventListener("dblclick", () => {
        inputBox.remove();
        updateStorage();
    });

    // Not değişince kaydet
    inputBox.addEventListener("input", updateStorage);

    notesContainer.appendChild(inputBox);
    updateStorage();
});

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

function loadNotes() {
    let savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes;
        // Kaydedilen notlara olay ekleyelim
        document.querySelectorAll(".input-box").forEach(note => {
            note.addEventListener("dblclick", () => {
                note.remove();
                updateStorage();
            });
            note.addEventListener("input", updateStorage);
        });
    }
}
