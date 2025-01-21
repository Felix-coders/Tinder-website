document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const birthdateInput = document.getElementById("birthdate");
    const genderInput = document.getElementById("gender");
    const lookingForInput = document.getElementById("looking-for");
    const termsCheckbox = document.getElementById("terms");

    function clearErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach((message) => message.remove());

        const errorFields = document.querySelectorAll(".error");
        errorFields.forEach((field) => field.classList.remove("error"));
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault(); 
        clearErrors(); 

        let isValid = true;

        if (nameInput.value.trim().length < 3) {
            isValid = false;
            addError(nameInput, "Full Name must be at least 3 characters long.");
        }

        if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
            isValid = false;
            addError(emailInput, "Please enter a valid email address.");
        }

        if (passwordInput.value.length < 6) {
            isValid = false;
            addError(passwordInput, "Password must be at least 6 characters long.");
        }

        const today = new Date();
        const birthdate = new Date(birthdateInput.value);
        const age = today.getFullYear() - birthdate.getFullYear();
        const monthDiff = today.getMonth() - birthdate.getMonth();
        const dayDiff = today.getDate() - birthdate.getDate();

        if (isNaN(birthdate.getTime()) || age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
            isValid = false;
            addError(birthdateInput, "You must be at least 18 years old.");
        }

        if (!genderInput.value) {
            isValid = false;
            addError(genderInput, "Please select your gender.");
        }

        if (!lookingForInput.value) {
            isValid = false;
            addError(lookingForInput, "Please select what you are looking for.");
        }

        if (!termsCheckbox.checked) {
            isValid = false;
            addError(termsCheckbox, "You must agree to the Terms of Service and Privacy Policy.");
        }

        if (isValid) {
            form.submit(); 
        }
    });

    function addError(inputField, message) {
        inputField.classList.add("error");

        const errorMessage = document.createElement("span");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = message;

        inputField.parentElement.appendChild(errorMessage);
    }
});


