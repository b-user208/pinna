
window.addEventListener('scroll', () => {
    if(window.scrollY > 0) {
        document.querySelector(".navbar").classList.add("scrolled");
    } else {
        document.querySelector(".navbar").classList.remove("scrolled");
    }
});

document.querySelector(".text-actions:nth-child(1)").addEventListener("mousedown", (e) => { e.preventDefault(); document.execCommand("bold")});
document.querySelector(".text-actions:nth-child(2)").addEventListener("mousedown", (e) => { e.preventDefault(); document.execCommand("italic")});
document.querySelector(".text-actions:nth-child(3)").addEventListener("mousedown", (e) => {e.preventDefault(); document.execCommand("underline")});

let select = document.getElementById("text-size");

select.addEventListener("change", () => {
    size = select.value
    document.execCommand("formatBlock", false, `${size}`);
})

document.querySelector(".list-actions:nth-child(1)").addEventListener("mousedown", (e) => { e.preventDefault(); document.execCommand("insertUnorderedList");})
document.querySelector(".list-actions:nth-child(2)").addEventListener("mousedown", (e) => { e.preventDefault(); document.execCommand("insertOrderedList");})


document.querySelector(".align-actions:nth-child(1)").addEventListener("mousedown", (e) => { e.preventDefault(); document.execCommand("justifyLeft");})
document.querySelector(".align-actions:nth-child(2)").addEventListener("mousedown", (e) => { e.preventDefault(); document.execCommand("justifyCenter");})
document.querySelector(".align-actions:nth-child(3)").addEventListener("mousedown", (e) => { e.preventDefault(); document.execCommand("justifyRight");})


let mode = document.getElementById("mode");

mode.addEventListener("click", () => {
    let moon = document.getElementById("moon")
    let sun = document.getElementById("sun")
    if(moon) {
    mode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" id="sun" width="30" height="30" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16">
                                                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                                            </svg>`
    localStorage.setItem("theme", "light")
    document.documentElement.setAttribute("data-theme", "light")
    } else {
        mode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" id="moon" width="30" height="30" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
                        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
                    </svg>`
    document.documentElement.removeAttribute("data-theme")
    localStorage.removeItem("theme")
    }
})


let copied = document.getElementById("copied");
let download = document.getElementById("download");
let supp = document.getElementById("delete");
let speak = document.getElementById("start-recording");

const body = document.querySelector(".body");
const counter = document.querySelector(".numbers");
let listening = false;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = "fr-FR"
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
        let texte = "";
        for(let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i]
            const t = result[0].transcript
            if(result.isFinal) {
                texte += t + " "
            }
            if(texte) {
                body.append(texte);
            }
        }
    }
    recognition.onend = () => {
        if(listening) {
            recognition.start();
        }
    }

[copied, download, supp, speak].forEach(element => {
    element.addEventListener("click", () => {
        if(element === copied) {
            async function copied() {
                const copiedText = document.querySelector(".body");
                const html = copiedText.innerHTML;
                await navigator.clipboard.write([
                    new ClipboardItem({
                        "text/html": new Blob([html], {type: "text/html"}),
                        "text/plain": new Blob([copiedText.innerText], {type: "text/plain"}),
                    })
                ]);
            }
            copied();
            let originalElement = element.innerHTML;
            element.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
            </svg>`
            setTimeout(() => {
                element.innerHTML = originalElement;
            }, 1300);
        }
        if(element === download) {
            const type = document.getElementById("export-type").value || "txt";
            const link = document.createElement("a");
            const date = new Date().toLocaleDateString();
            const fileName = (body.textContent.split("\n")[0] !== "")? body.textContent.split("\n")[0].trim().slice(0, 50).replace(/[\\/:*?"<>|]/g, ""): `Pinna-${date}`;
            switch(type) {
                case "txt" :
                    const textTxt = body.innerText.trim();
                    const blobTxt = new Blob([textTxt], { type: "text/plain" });
                    const urlTxt = URL.createObjectURL(blobTxt);
                    link.href = urlTxt;
                    link.download = `${fileName}.txt`;
                    link.click();
                    URL.revokeObjectURL(urlTxt);
                break;
                case "html" : 
                    const textHtml = body.innerHTML.trim();
                    const blobHtml = new Blob([textHtml], { type: "text/html" });
                    const urlHtml = URL.createObjectURL(blobHtml);
                    link.href = urlHtml;
                    link.download = `${fileName}.html`;
                    link.click();
                    URL.revokeObjectURL(urlHtml);
                break;
            }
        }
        if(element === supp) {
            const text = document.querySelector(".body");
            text.innerHTML = "";
            counter.innerText = "0";
            localStorage.removeItem("contenu")
        }
        if(element === speak) {
            let originalBtn = `<svg xmlns="http://www.w3.org/2000/svg" id="listen-off" width="16" height="16" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16">
                    <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z"/>
                    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
                </svg>
                <span>Enregister</span>`
            let btn = document.getElementById("start-recording")
            if(!listening) {
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  id="listen-on" width="15" height="15" fill="currentColor" class="bi bi-square-fill" viewBox="0 0 16 16">
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z"/>
                            </svg> <span>Arrêter</span>`
                document.querySelector(".color").classList.add("listening")
                listening = true;
                recognition.start();
            } else {
                document.querySelector(".color").classList.remove("listening")
                btn.innerHTML = `${originalBtn}`
                listening = false;
                recognition.stop();
            }
        }
    })
});

body.addEventListener("input", () => {
    const text = body.innerText.replace(/[\n\r]/g, "");
    localStorage.setItem("contenu", body.innerHTML)
    counter.innerText = text.length; 
});

document.addEventListener("DOMContentLoaded",() => {
    const contenu = localStorage.getItem("contenu")
    const theme = localStorage.getItem("theme")
    if(contenu) {
        body.innerHTML = contenu.trim()
    }
    if(theme) {
        mode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" id="sun" width="30" height="30" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16">
                            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                        </svg>`
        document.documentElement.setAttribute("data-theme", `${theme}`)
    }
})
