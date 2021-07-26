let userId;

window.onload = () => {
    firebase.auth()
        .onAuthStateChanged(user => {
            if (user) {
                console.log(`Logged in as: ${user.displayName}`);
                userId = user.uid;

            } else {
                window.location = "index.html";
            }
        });
}

const submitNote = () => {
    const note = document.querySelector("#noteText").value;
    const title = document.querySelector("#noteTitle").value;

    firebase.database().ref(`users/${userId}`).push(
        {
            title: title,
            note: note
        })
        .then(() => {
            document.querySelector("#noteText").value = "";
            document.querySelector("#noteTitle").value = "";
        })
        .catch(error => {
            console.log(`Something bad happened: ${error}`)
        });
};
