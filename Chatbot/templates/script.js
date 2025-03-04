let lightMode = true;
let isFirstMessage = true;
const baseUrl = "http://127.0.0.1:8000";
const responses = [];

async function showBotLoadingAnimation() {
    await sleep(200);
    $(".loading-animation")[1].style.display = "inline-block";
    document.getElementById('send-button').disabled = true;
}

function hideBotLoadingAnimation() {
    $(".loading-animation")[1].style.display = "none";
    if (!isFirstMessage) {
        document.getElementById('send-button').disabled = false;
    }
}

async function showUserLoadingAnimation() {
    await sleep(100);
    $(".loading-animation")[0].style.display = "flex";
}

function hideUserLoadingAnimation() {
    $(".loading-animation")[0].style.display = "none";
}

const processUserMessage = async (userMessage) => {
    let response = await fetch(baseUrl + "/process-message", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: userMessage }),
    });
    response = await response.json();
    return response;
};

const cleanTextInput = (value) => {
    return value
        .trim()
        .replace(/[\n\t]/g, "")
        .replace(/<[^>]*>/g, "")
        .replace(/[<>&;]/g, "");
};

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

const scrollToBottom = () => {
    $("#chat-window").animate({
        scrollTop: $("#chat-window")[0].scrollHeight,
    });
};

const populateUserMessage = (userMessage) => {
    $("#message-input").val("");
    $("#message-list").append(
        `<div class='message-line my-text'><div class='message-box my-text${!lightMode ? " dark" : ""}'><div class='me'>${userMessage}</div></div></div>`
    );
    scrollToBottom();
};

const populateBotResponse = async (userMessage) => {
    await showBotLoadingAnimation();

    let response;
    let uploadButtonHtml = '';

    if (isFirstMessage) {
        response = { botResponse: "Hello there! I'm your friendly data assistant, ready to answer any questions regarding your data. Could you please upload a PDF file for me to analyze?" };
        uploadButtonHtml = `
            <input type="file" id="file-upload" accept=".pdf" hidden>
            <button id="upload-button" class="btn btn-primary btn-sm">Upload File</button>
        `;
        isFirstMessage = false;
    } else {
        response = await processUserMessage(userMessage);
    }

    renderBotResponse(response, uploadButtonHtml);

    if (uploadButtonHtml) {
        $("#upload-button").on("click", function () {
            $("#file-upload").click();
        });

        $("#file-upload").on("change", async function () {
            const file = this.files[0];
            await showBotLoadingAnimation();
            const formData = new FormData();
            formData.append('file', file);
            let response = await fetch(baseUrl + "/process-document", {
                method: "POST",
                headers: { Accept: "application/json" },
                body: formData,
            });

            if (response.status !== 400) {
                document.querySelector('#upload-button').disabled = true;
            }

            response = await response.json();
            renderBotResponse(response, '');
        });
    }
};

const renderBotResponse = (response, uploadButtonHtml) => {
    responses.push(response);
    hideBotLoadingAnimation();
    $("#message-list").append(
        `<div class='message-line'><div class='message-box${!lightMode ? " dark" : ""}'>${response.botResponse.trim()}<br>${uploadButtonHtml}</div></div>`
    );
    scrollToBottom();
}

$(document).ready(function () {
    document.getElementById('send-button').disabled = true;

    $("#message-input").keyup(function (event) {
        let inputVal = cleanTextInput($("#message-input").val());

        if (event.keyCode === 13 && inputVal !== "") {
            const message = inputVal;
            populateUserMessage(message);
            populateBotResponse(message);
        }
    });

    $("#send-button").click(async function () {
        const message = cleanTextInput($("#message-input").val());
        populateUserMessage(message);
        populateBotResponse(message);
    });

    $("#reset-button").click(async function () {
        $("#message-list").empty();
        responses.length = 0;
        isFirstMessage = true;
        document.querySelector('#upload-button').disabled = false;
        populateBotResponse();
    });

    $("#light-dark-mode-switch").change(function () {
        $("body").toggleClass("dark-mode");
        $(".message-box").toggleClass("dark");
        $(".loading-dots").toggleClass("dark");
        $(".dot").toggleClass("dark-dot");
        lightMode = !lightMode;
    });

    populateBotResponse();
});
