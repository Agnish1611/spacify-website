import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const textInput = document.getElementById('text-input');
const sendChat = document.querySelector('#input-area img')
const messages = document.getElementById('messages');

let userMsg;

async function run(incomingMsg) {
    const msgElement = incomingMsg.querySelector('p');

    const result = await model.generateContent(userMsg);
    textInput.value = "";
    const response = await result.response;
    const text = response.text();
    console.log(text);

    msgElement.textContent = text;
    messages.scrollTo(0, messages.scrollHeight);
}

const createChatLi = (message, className) => {
    const chatLi = document.createElement('li');
    chatLi.classList.add('message',className);
    let chatText = `<p>${message}</p>`;
    chatLi.innerHTML = chatText;
    return chatLi;
}

const handleChat = () => {
    console.log('hiii');
    userMsg = textInput.value.trim();
    if (!userMsg) return;
    messages.appendChild(createChatLi(userMsg, 'outgoing'));
    messages.scrollTo(0, messages.scrollHeight);

    setTimeout(() => {
        const incomingMsg = createChatLi('Thinking ...', 'incoming');
        messages.appendChild(incomingMsg);
        messages.scrollTo(0, messages.scrollHeight);
        run(incomingMsg);
    }, 600);
}

sendChat.addEventListener('click', handleChat);