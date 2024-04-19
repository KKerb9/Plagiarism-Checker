function readFileAsText(file) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(event) {
            resolve(event.target.result);
        };
        reader.onerror = function(error) {
            reject(error);
        };
    });
}

$(document).ready(function() {
    $('#check').click(async function() {
        var swapCost = ($('#swapCost').val() != '') ? $('#swapCost').val() : '1', delCost = ($('#delCost').val() != '') ? $('#delCost').val() : '1', addCost = ($('#addCost').val() != '') ? $('#addCost').val() : '1';
        if (swapCost )
        console.log(swapCost, delCost, addCost);

        var textareaVal1 = $('#textarea-1').val();
        var textareaVal2 = $('#textarea-2').val();

        var fileInput1, fileInput2;
        if ($('#fileInput1')[0].files.length > 0) {
            fileInput1 = $('#fileInput1')[0].files[0];
        } else {
            fileInput1 = "empty";
        }
        if ($('#fileInput2')[0].files.length > 0) {
            fileInput2 = $('#fileInput2')[0].files[0];
        } else {
            fileInput2 = "empty";
        }
        if ((textareaVal1 == '' && fileInput1 == "empty") || (textareaVal2 == '' && fileInput2 == "empty")) {
            alert("You did't provide one of the files.");
        } else {
            if ((textareaVal1 == '' && (fileInput1 == "empty" || !fileInput1.type || !fileInput1.type.match('text.*'))) || (textareaVal2 == '' && (fileInput2 == "empty" || !fileInput2.type || !fileInput2.type.match('text.*')))) {
                alert("Please select a text file");
            } else {
                if ((fileInput1 != "empty" && textareaVal1 != '') || (fileInput2 != "empty" && textareaVal2 != '')) {
                    alert("Please, select only one input for text");
                } else {
                    var res = confirm("Сonfirm the action");
                    if (res) { 
                        $('#textarea-1').val('');
                        $('#textarea-2').val('');
                        $('#fileInput1')[0].value = '';
                        $('#fileInput2')[0].value = '';
                        $('#fileLabel1')[0].textContent = 'No file selected';
                        $('#fileLabel2')[0].textContent = 'No file selected';
                        
                        var text1 = '', text2 = '';

                        if (fileInput1 != "empty") {
                            text1 = await readFileAsText(fileInput1);
                        } else {
                            text1 = textareaVal1;
                        }
                        if (fileInput2 != "empty") {
                            text2 = await readFileAsText(fileInput2);
                        } else {
                            text2 = textareaVal2;
                        }
                        console.log(text1);
                        console.log(text2);

                        $.ajax({
                            url: '/upload',
                            type: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify({'text1': text1, 'text2': text2, 'swap-cost': swapCost, 'delete-cost': delCost, 'insert-cost': addCost}),
                            // data: JSON.stringify({'textarea-1': textareaVal1, 'textarea-2': textareaVal2, 'file-input-1': fileInput1, 'file-input-2': fileInput2}),
                            success: function(response) {
                                console.log('Данные успешно отправлены на сервер:', response);
                            },
                            error: function(error) {
                                console.error('Произошла ошибка при отправке данных:', error);
                            }
                        });
                    }
                }
            }
        }
    });
});


$(document).ready(function() {
    $('#result').click(function () {
        $.ajax({
            url: '/results',
            type: 'GET',
            success: function(response) {
                console.log('Результаты обработки файлов:', response);
            },
            error: function(error) {
                console.error('Произошла ошибка при получении результатов:', error);
            }
        });
    });
});


document.getElementById('result').addEventListener('click', function() {
    window.location.href = "/results";
});