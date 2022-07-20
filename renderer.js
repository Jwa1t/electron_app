const information = document.getElementById('info');
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

const setButton0 = document.getElementById('btn0');
const titleInput = document.getElementById('title');
setButton0.addEventListener('click', () => {
    const title = titleInput.value;
    window.electronAPI.setTitle(title);
});

const setButton1 = document.getElementById('btn1');
const filePathElement = document.getElementById('filePath');
setButton1.addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFile();
    filePathElement.innerText = filePath;
});



