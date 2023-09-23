function changeToSignUp(event) {
    event.preventDefault(); // Prevent default behavior of the link

    var signinForm = document.getElementById("signin");
    var signupForm = document.getElementById("signup");

    if (signinForm && signupForm) {
        signinForm.style.display = "none";
        signupForm.style.display = "block";
    }
}

function changeToSignIn(event) {
    event.preventDefault(); // Prevent default behavior of the link
    var signinForm = document.getElementById("signin");
    var signupForm = document.getElementById("signup");

    if (signinForm && signupForm) {
        signinForm.style.display = "block";
        signupForm.style.display = "none";
    }
}

function changeToshopSignUp(event) {
    event.preventDefault(); // Prevent default behavior of the link

    var signinForm = document.getElementById("signin");
    var signupForm = document.getElementById("signup");

    if (signinForm && signupForm) {
        signinForm.style.display = "none";
        signupForm.style.display = "block";
    }
}

function changeToshopSignIn(event) {
    event.preventDefault(); // Prevent default behavior of the link
    var signinForm = document.getElementById("signin");
    var signupForm = document.getElementById("signup");

    if (signinForm && signupForm) {
        signinForm.style.display = "block";
        signupForm.style.display = "none";
    }
}
function changeToReset(event) {
    event.preventDefault(); // Prevent default behavior of the link

    var signinForm = document.getElementById("signin");
    var reset = document.getElementById("reset");
    if (signinForm && reset) {
        signinForm.style.display = "none";
        resetForm.style.display = "block";
    }
}
