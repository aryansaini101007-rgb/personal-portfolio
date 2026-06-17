// ===== Premium Gallery Effects =====

document.querySelectorAll(".project-details img").forEach((img) => {

    img.addEventListener("mousemove", (e) => {

        const rect = img.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        img.style.transform = `
            perspective(1400px)
            rotateY(${x * 15}deg)
            rotateX(${-y * 15}deg)
            scale(1.06)
        `;

        img.style.boxShadow = `
            0 0 30px rgba(124,255,79,.15),
            0 20px 60px rgba(0,0,0,.45)
        `;

        img.style.borderColor = "rgba(124,255,79,.35)";
    });

    img.addEventListener("mouseleave", () => {

        img.style.transform = "";

        img.style.boxShadow = "";

        img.style.borderColor = "";

    });

});


// ===== Image Lightbox =====

document.querySelectorAll(".project-details img").forEach((img) => {

    img.addEventListener("click", () => {

        const overlay = document.createElement("div");

        overlay.className = "lightbox";

        overlay.innerHTML = `
            <img src="${img.src}" alt="">
        `;

        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => {
            overlay.remove();
        });

    });

});
// ===== Cursor Glow =====

const glow = document.createElement("div");

glow.className = "cursor-glow";

document.body.appendChild(glow);

window.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});