const fileInput1 = document.getElementById('fileInput1');
const fileLabel1 = document.getElementById('fileLabel1');

console.log(111);

fileInput1.addEventListener('change', function() {
    if (fileInput1.files.length > 0) {
        fileLabel1.textContent = fileInput1.files[0].name;
    } else {
        fileLabel1.textContent = 'No file selected';
    }
});

const fileInput2 = document.getElementById('fileInput2');
const fileLabel2 = document.getElementById('fileLabel2');

fileInput2.addEventListener('change', function() {
    if (fileInput2.files.length > 0) {
        fileLabel2.textContent = fileInput2.files[0].name;
    } else {
        fileLabel2.textContent = 'No file selected';
    }
});