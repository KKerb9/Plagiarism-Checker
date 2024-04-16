$(document).ready(function() {
    $('#check').click(function() {
        var textareaVal1 = $('#textarea-1').val();
        var textareaVal2 = $('#textarea-2').val();

        // var data = {
        //     textarea1: textareaVal1,
        //     textarea2: textareaVal2
        // };

        $.ajax({
            url: '/get',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({textarea1: textareaVal1, textarea2: textareaVal2}),
            success: function(response) {
                console.log('Данные успешно отправлены на сервер:', response);
            },
            error: function(error) {
                console.error('Произошла ошибка при отправке данных:', error);
            }
        });
    });
});