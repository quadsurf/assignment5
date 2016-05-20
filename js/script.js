//AIzaSyAfJBcanKgDnx
//start base64 encoder

var userGlobal = null;
var catimage = null;

function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}
//end base64 encoder
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

//login logout manage user session state
$(function() {

  $('#welcome').on('click', 'a', function() {
    localStorage.clear();
    $(this).empty();
    window.location.href = "signup.html";
  });

    $('.panel-body').hide();

    // Learn more about Init
    this.init = function() {
        var user = data.get('user');

        if (user) {
            $('#welcome').show().text('Welcome ' + user.firstname + '! - ').append("<a href='#'>Logout</a>");

            userGlobal = user;

            $('#catimageDisplay').show();

            // if (userGlobal && userGlobal.categories && userGlobal.categories[0].hasOwnProperty(name)) {

            var cats = userGlobal.categories[0];
            $('#catnameDisplay').text(cats.name);
            // var catimage = getBase64Image(cats.image);
            $('#catimageDisplay p').append("<img src='"+cats.image+"' height='100px' class='img-thumbnail' style='margin-right:15px;'>" + "<b>Base " + cats.name + " Image</b>");

            $.each(cats.toppings, function(i, top) {
                $('#catimageDisplay p').after('<div class="col-xs-5" style="margin:10px;""><img src="'+top.image+'" width="60px" class="img-circle" /> '+top.name+'</div>');
            });
            //}



        }
    }

    this.init();

    //signup signup.html create user object
    $('#create').submit(function() {
        var firstname = $('#firstname').val();
        var email = $('#email').val();
        var password = $('#pass').val();

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

        window.location.href = "menu.html";

        return false;
    });

    $('#addcat').click(function() {
        $('.panel-body').show();
        $('#addcat').prop("disabled", true);
    });

    $('#menunext').click(function() {
      window.location.href = "settings.html";
    });

    $('#settingsnext').click(function() {
      window.location.href = "thankyou.html";
    });

    //save menu
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

        $('#opener').prop("disabled", false);
        $('#addcat').prop("disabled", false);

        $('#savedcatPanel-1').show();

        var cats = data.get('user').categories[0];
        $('#catnameDisplay').text(cats.name);

        maincatimage = cats.image;
        maincatname = cats.name;

        $('#catimageDisplay p').append("<img src='" + maincatimage + "' height='100px' class='img-thumbnail' style='margin-right:15px;'>" + "<b>Base " + maincatname + " Image</b>");

        $.each(cats.toppings, function(i, top) {
            $('#catimageDisplay p').after('<div class="col-xs-5" style="margin:10px;""><img src="'+top.image+'" width="60px" class="img-circle" /> '+top.name+'</div>');
        });

        userGlobal = user;

        return false;
    });

    //modal
    $("#dialog").dialog({ autoOpen: false });
    $("#opener").click(function() {
      $("#dialog").dialog("open").dialog({width: 910},{height: 700});
      //$('#dialog').append(userGlobal.categories[0].name);
      $('#dialog').append("<img src='" + userGlobal.categories[0].image + "' class='img-responsive' style='z-index: 10000;'>");
    });


    $('#addtopp').click(function(){

        var lastTopping = $(".topping").last();
        var topping = lastTopping.clone();
        var newId = "toppingId-" + (parseInt( $(".topping").last().attr('id').split('-')[1] ) + 1);

        var $copy = topping;
        var nextId = $('.topping').length+1;

        console.log( nextId );
        // update other props
        topping.attr('id', newId);

        var newToppingName = "toppingName-"+newId;
        console.log(newToppingName);
        // $("label[for='toppingName-1']").attr('for', newToppingName);
        // $("input[name='toppingName-1']").attr('name', newToppingName);
        // $("input[id='toppingName-1']").attr('id', newToppingName);

        // var newToppingImage = "toppingImage-"+newId;
        // console.log(newToppingImage);
        // $("label[for='toppingImage-1']").attr('for', newToppingImage);
        // $("input[name='toppingImage-1']").attr('name', newToppingImage);
        // $("input[id='toppingImage-1']").attr('id', newToppingImage);
        console.log($('input[type="text"].inputSmall', $copy))
        $('input[type="text"].inputSmall', $copy).val('');
        $('input[type="text"].inputSmall', $copy).attr('id', 'toppingname'+nextId);
        $('input[type="text"].inputSmall', $copy).attr('name', 'toppingname'+nextId);
        $('input[type="text"].inputSmall', $copy).attr('placeholder', 'topping name '+nextId);

        $('.uploader', $copy).attr('id', 'toppingimage'+nextId);
        $('.uploader', $copy).attr('name', 'toppingimage'+nextId);

        lastTopping.after($copy);
    });

    $('body').on('change', '.uploader', function() {
        readFromFileBrowser($(this));
    });




}); //end jQuery
//xEF7dbe71RUsn0CRA6Mlw
