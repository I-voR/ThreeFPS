$(function () {
    let element
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            element = $('<div>')
            element
                .css('left', 50 * x + 'px')
                .css('top', 50 * y + 'px')
                .attr('id', y + '-' + x)
                .addClass('square')
            $('#tileset').append(element)
        }
    }

    $(".tiletype-button").click(function (event) {
        $(".tiletype-button").each(function () { $('#' + this.id).removeClass('selected') })
        $('#' + event.target.id).addClass('selected')
    })



    function check() {
        let chosenCheck = false
        let typ
        $(".tiletype-button").each(function () {
            if ($('#' + this.id).hasClass('selected')) {
                chosenCheck = true
                typ = $('#' + this.id).attr('class').split(" ")[0]

            }
        })
        return [chosenCheck, typ]
    }



    $(".square").click(function (event) {
        console.log(event.target.className)

        let dane = check()
        if (dane[0]) {
            if (dane[1] == 'remove') {
                $("#" + event.target.id).removeClass()
                $("#" + event.target.id).addClass('square')
            } else {
                $("#" + event.target.id).removeClass()
                $("#" + event.target.id).addClass('square').addClass(dane[1])
            }




        } else {
            alert("Wybierz typ obiektu!")
        }

    });


});