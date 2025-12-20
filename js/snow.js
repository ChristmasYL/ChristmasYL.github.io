const snowContainer = document.getElementById("snow");

function createSnowflake() {
    const snowflake = document.createElement("div");

    snowflake.style.position = "absolute";
    snowflake.style.top = "-10px";
    snowflake.style.left = Math.random() * window.innerWidth + "px";
    snowflake.style.width = snowflake.style.height = Math.random() * 4 + 4 + "px";
    snowflake.style.background = "white";
    snowflake.style.borderRadius = "50%";
    snowflake.style.opacity = Math.random();
    snowflake.style.filter = "blur(1px)";

    snowContainer.appendChild(snowflake);

    const fallDuration = Math.random() * 5 + 5;

    snowflake.animate([
        { transform: "translateY(0)" },
        { transform: `translateY(${window.innerHeight + 20}px)` }
    ], {
        duration: fallDuration * 1000,
        easing: "linear"
    });

    setTimeout(() => {
        snowflake.remove();
    }, fallDuration * 1000);
}

function start() {
        setTimeout(function() {
            window.location.href = "ball.html";
        }, 1500);
    }

setInterval(createSnowflake, 200);
