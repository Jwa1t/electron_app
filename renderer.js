const information = document.getElementById('info');
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

// Button listener for renderer to main (one-way)
const setButton0 = document.getElementById('btn0');
const titleInput = document.getElementById('title');
setButton0.addEventListener('click', () => {
    const title = titleInput.value;
    window.electronAPI.setTitle(title);
});

// Button listener for renderer to main (two-way)
const setButton1 = document.getElementById('btn1');
const filePathElement = document.getElementById('filePath');
setButton1.addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFile();
    filePathElement.innerText = filePath;
});

// Handles main to renderer
const counter = document.getElementById('counter');
window.electronAPI.onUpdateCounter((event, value) => {
    const oldValue = Number(counter.innerText);
    const newValue = oldValue + value;
    counter.innerText = newValue;
    // How to send reply back to main creating a two way(Can't use invoke)
    event.sender.send('counter-value', newValue);
});

// Button listener for quitting app
const setButton2 = document.getElementById('btn2');
setButton2.addEventListener('click', () => {
    window.electronAPI.quitApp();
});