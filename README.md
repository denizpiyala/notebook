# notebook
"A personal notebook web app where users can write and store notes, with the ability to add new notes dynamically." "A simple, interactive web-based notebook allowing users to add and edit notes." "A personal note-taking app built with HTML, CSS, and JavaScript, featuring editable text areas and local storage."

HTML PARTS
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personal Notebook</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>You can write anything</h1>
        <button class="btn">First click this button and write something</button>
        <div class="notes-container"></div> 
    </div>
    <script src="script.js"></script>
</body>
</html>
CSS part

* {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
}

.container {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(45deg, #660066 ,#ffe6ff);
    color: #fff;
    padding-top: 4%;
    padding-left: 10%;
}

.container h1 {
    color: rgb(31, 1, 74);
    font-size: 50px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
}

.container button {
    display: block;
    margin: 10px auto; /* Ortalar */
    background-color: #660066;
    border: none;
    color: white;
    padding: 12px 24px;
    border-radius: 20px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: 0.3s;
}

.container button:hover {
    background: #a6c1d7;
    color: white;
    box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.5);
}

.notes-container {
    width: 80%;
    
    max-width: 600px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    gap: 10px; /* Notlar arasına boşluk bırakır */
}

textarea {
    width: 100%;
    height: 150px;
    padding: 15px;
    font-size: 16px;
    color: black;
    background: white;
    border: 2px solid #ccc;
    border-radius: 8px;
    outline: none;
    resize: none;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
}

textarea:focus {
    border-color: #660066;
    box-shadow: 0 0 10px rgba(102, 0, 102, 0.5);
}


textarea::placeholder {
    color: #999;
    font-style: italic;
}

const notesContainer = document.querySelector(".notes-container");
const createButton = document.querySelector(".btn");

document.addEventListener("DOMContentLoaded", loadNotes);

createButton.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.innerText = "New note...";

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

