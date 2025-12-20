function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function checkCode() {
    const correctCode = "31861"; // ← нужный код
    const input = document.getElementById("codeInput").value;

    if (input === correctCode) {
        window.location.href = "trees.html";
    } else {
        alert("Не тот хлопок… попробуй ещё 🎶");
    }
}
