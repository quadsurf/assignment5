// start base64 image stringifier
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
// end base64 image stringifier

// start image getter
// var dataImage = localStorage.getItem('imgData');
// bannerImg = document.getElementById('test');
// bannerImg.src = "data:image/png;base64," + dataImage;
// end image getter


var data = {
    set: function(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    get: function(key) {
        try {
            return JSON.parse(window.localStorage.getItem(key));
        } catch (e) {
            return null;
        }
    }
}

var files = {};
function readFromFileBrowser($el) {
    var reader = new FileReader();
    var name = $($el).attr('name');

    reader.readAsDataURL($el[0].files[0]);
    reader.onload = function (e) {
      files[name] = e.target.result;
    };
}

function updateUser(user) {
    data.set('user', user);
    data.set(user.id, user);
}

$(function() {

    // var passw = $('#pass');
    // var cbutton = $('#cbutton');
    // var emaila = $('#email');
    // if (!passw.is(":focus")) {
    //   cbutton.hide();
    //   console.log("pass has no focus");
    // }
    // if (emaila.blur()) {
    //   cbutton.show();
    //   console.log("pass has focus");
    // }

    $('#categoryID').hide();
    $('#toppingID').hide();

    $('.form-slider').slick({
        // setting-name: setting-value
        // breaks when above line is enabled???
    });

    // Learn more about Init
    this.init = function() {
        var user = data.get('user');

        if (user) { // If logged in
            console.log('Logged in User: ' + user);
            $('#form1').hide();
            $('#welcome a').empty().text('Welcome ' + user.firstname);
        } else { // if not logged in
            console.log('Not logged on!');
        }
    }

    this.init();

    $('#create').submit(function() {
        var firstname = $('#firstname').val();
        var email = $('#email').val();
        var password = $('#pass').val();

        // data.set('firstName', firstname);
        // data.set('email', email);
        // data.set('password', password);

        var id = data.get('lastId') + 1;

        data.set(id, {
            'id' : id,
            'firstname': firstname,
            'email': email,
            'password': password
        });

        var user = data.get(id);
        data.set('lastId', id);
        data.set('user', user);

        // Finding user first name
        $('#welcome a').empty().text('Welcome ' + user.firstname);
        $(".slick-next").click();
        $('#form1').hide();
        return false;
    });

    $('#addcat').click(function() {
        $('#categoryID').show();
        $('#toppingID').show();
    });

    $('#menu').submit(function() {
        var catName = $('#catname').val();
        var baseImageData = files.baseimage;

        var user = data.get('user');

        user.categories = user.categories || [];

        var toppingCount = $('.topping').length;

        var toppings = [];
        for(i = 1; i <= toppingCount; i++) {
            var toppingName = $('#toppingname'+i).val();
            var toppingImageData = files['toppingimage'+i];

            toppings.push({
                name: toppingName,
                image: toppingImageData
            });
        }//end for loop

        user.categories.push({
            name : catName,
            image : baseImageData,
            toppings: toppings
        });

        updateUser(user);
        console.log('updated');
        // data.set('user', user);
        // var userId = user.id;

        $('.removebuttonstyling').show();

        return false;
    });

    $('#addtopp').click(function(){
        var $copy = $(this).prev().clone();
        var nextId = $('.topping').length+1;

        //learn more about selector context, i.e $('div', $('.topping'));
        $copy.attr('id', 'toppingID'+nextId);
        $('.inputText', $copy).val('');
        $('.inputText', $copy).attr('id', 'toppingname'+nextId);
        $('.inputText', $copy).attr('name', 'toppingname'+nextId);
        $('.inputText', $copy).attr('placeholder', 'topping name '+nextId);

        $('.uploader', $copy).attr('id', 'toppingimage'+nextId);
        $('.uploader', $copy).attr('name', 'toppingimage'+nextId);

        $(this).before($copy);
    });

    $('.uploader').change(function() {
        readFromFileBrowser($(this));
    });

}); //end jQuery
