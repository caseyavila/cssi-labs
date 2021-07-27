// When page loads, check user logged in state
// If not logged in, redirect to log in page
// If logged in, get user's notes from db
//      Display notes on page

window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const googleUserId = user
            getNotes(googleUserId);
        } else {
            window.location = "index.html";
        }
    });
}


const getNotes = (user) => {
    //console.log(userId);
    const userRef = firebase.database().ref(`users/${user.uid}`);
    userRef.on("value", snapshot => {
        writeNotesToHtml(snapshot.val(), user.displayName);
    });
}


const writeNotesToHtml = (data, name) => {
    const noteRenderArea = document.querySelector("#app");
    console.log(data);

    for (let noteKey in data) {
        let noteHtml = createHtmlForNote(data[noteKey], name);
        noteRenderArea.appendChild(noteHtml);
    }
}



const createHtmlForNote = (note, name) => {
    //console.log(note);
    
    let color = Math.floor(Math.random() * 16777215).toString(16);

    let column = document.createElement("div");
    column.setAttribute("class", "column");
    //let columnAttribute = document.createAttribute("class");
    //columnAttribute.value = "column";
    //column.setAttributeNode(columnAttribute);

    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.style.backgroundColor = `#${color}`;

    let header = document.createElement("header");
    header.setAttribute("class", "card-header");

    let title = document.createElement("p");
    title.setAttribute("class", "card-header-title");

    let titleNode = document.createTextNode(`${note.title} - ${name}`);

    let cardContent = document.createElement("div");
    cardContent.setAttribute("class", "card-content");

    let content = document.createElement("div");
    content.setAttribute("class", "content");

    let noteNode = document.createTextNode(`${note.note}`);

    title.appendChild(titleNode);
    header.appendChild(title);

    content.appendChild(noteNode);
    cardContent.appendChild(content);

    card.appendChild(header);
    card.appendChild(cardContent);

    column.appendChild(card);

    return column;

}

function hi() {
    return `<div class="column">
                <div style="background-color: #${color};" class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            ${note.title} - ${name}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            ${note.note}
                        </div>
                    </div>
                </div>
            </div>`;
}
