const passcodeInput = document.querySelector("#passcode");

const submitMessage = () => {
    console.log("Submitting message...");

    passcodeInput = document.querySelector("#passcode");
    const messageInput = document.querySelector("#message");

    const passcodeValue = passcodeInput.value;
    const messageValue = messageInput.value;

    // Send to firebase
    firebase.database().ref().push({
        message: messageValue,
        passcode: passcodeValue
    });

    passcodeInput.value = "";
    messageInput.value = "";
};

const notification = document.querySelector("#notification");
const button = document.querySelector("#button");
passcodeInput.addEventListener("input", e => {
    let valid = false;

    for (let i = 0; i < passcodeInput.value.length; i++) {
        if ((passcodeInput.value.charCodeAt(i) <= 90 && passcodeInput.value.charCodeAt(i) >= 65) || (passcodeInput.value.charCodeAt(i) >= 48 && passcodeInput.value.charCodeAt(i) <= 57)) {
            valid = true;
            break;
        }
    }

    if (!valid) {
        button.style.pointerEvents = "none";
        notification.innerHTML = "Please use at least one number or one capital letter";
    } else {
        button.style.pointerEvents = "auto";
        notification.innerHTML = "Nice passcode";
    }

    
});


