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
        let type
        $(".tiletype-button").each(function () {
            if ($('#' + this.id).hasClass('selected')) {
                chosenCheck = true
                type = $('#' + this.id).attr('class').split(" ")[0]
            }
        })
        return [chosenCheck, type]
    }

    function mapRead(mode) {
        let object = []
        let tileObj;
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if ($('#' + y + '-' + x).attr('class').split(" ").length === 2 &&
                    $('#' + y + '-' + x).attr('class').split(" ")[1] !== 'delete') {
                    tileObj = { id: (y + '-' + x), x: x, z: y, type: $('#' + y + '-' + x).attr('class').split(" ")[1], }
                    object.push(tileObj)
                }
            }
        }
        if (mode) {
            return object
        } else {
            $('#mapdata').val(JSON.stringify(object, null, 2))
        }
    }

    function mapLoad(map) {
        console.log(map)
        map.forEach(element => {
            $("#" + element.id)
                .removeClass()
                .addClass('square').addClass(element.type)
        })
        $('#mapdata').val(JSON.stringify(map, null, 2))
    }

    $(".square").click(function (event) {
        console.log(event.target.className)

        let dane = check()
        if (dane[0]) {
            if (dane[1] === 'remove') {
                $("#" + event.target.id)
                    .removeClass()
                    .addClass('square')
            } else {
                $("#" + event.target.id)
                    .removeClass()
                    .addClass('square').addClass(dane[1])
            }

            mapRead(false)
        } else {
            alert("Wybierz typ obiektu!")
        }
    })

    $("#button-zapisz").click(function (event) {
        let map = JSON.stringify(mapRead(true))
        console.log(map)
        $.post("add", map)
    });

    $("#button-wczytaj").click(function (event) {
        $.post("load", function (data) {
            mapLoad(jQuery.parseJSON(data))
        })
    })
})
