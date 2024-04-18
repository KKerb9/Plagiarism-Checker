console.log('main js is running');

$(document).ready(function() {
    $('#check').click(function() {
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
                        $('#fileLabel1')[0].textContent = 'No file selected';
                        $('#fileLabel2')[0].textContent = 'No file selected';
                        // var text1, text2;
                        // var post_data = {
                        //     "text1": 
                        // }

                        $.ajax({
                            url: '/upload',
                            type: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify({'textarea-1': textareaVal1, 'textarea-2': textareaVal2, 'file-input-1': fileInput1, 'file-input-2': fileInput2}),
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