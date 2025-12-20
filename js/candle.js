const openBtn = document.getElementById("openCode");
const codeBox = document.getElementById("codeBox");
const checkBtn = document.getElementById("checkCode");
const input = document.getElementById("codeInput");
const error = document.getElementById("errorText");

// 👉 ЗАДАЙ КОД ЗДЕСЬ
const CORRECT_CODE = "31861"; // пример

openBtn.onclick = () => {
    codeBox.style.display = "block";
};

checkBtn.onclick = () => {
    if (input.value.trim().toUpperCase() === CORRECT_CODE) {
        window.location.href = "trees.html"; // следующая страница
    } else {
        error.style.display = "block";
    }
};
