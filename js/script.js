// start image setter
// bannerImage = document.getElementById('bannerImg');
// imgData = getBase64Image(bannerImage);
// localStorage.setItem("imgData", imgData);
// end image setter

// start base64 image stringifier
// function getBase64Image(img) {
//     var canvas = document.createElement("canvas");
//     canvas.width = img.width;
//     canvas.height = img.height;
//
//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);
//
//     var dataURL = canvas.toDataURL("image/png");
//
//     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
// }
// end base64 image stringifier

// start image getter
// var dataImage = localStorage.getItem('imgData');
// bannerImg = document.getElementById('tableBanner');
// bannerImg.src = "data:image/png;base64," + dataImage;
// end image getter


var localstorage = {
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

  // Init
	this.init = function() {
		var userId = localstorage.get('activeUser');

		if(userId) { // If logged in

		} else { // if not logged in

		}
	}

    $('#create').submit(function() {
    	var firstname = $('#firstname').val();
    	var email = $('#email').val();
    	var password = $('#pass').val();

    	// localstorage.set('firstName', firstname);
    	// localstorage.set('email', email);
    	// localstorage.set('password', password);

    	var id = localstorage.get('lastId') + 1;

    	localstorage.set(id, {
    		'firstname' : firstname,
    		'email' : email,
    		'password': password
    	});

    	localstorage.set('lastId', id);
    	localstorage.set('activeUser', id);

    	// Finding user first name
    	var userId = localstorage.get('activeUser');
    	var user = localstorage.get(userId);

    	$('#welcome a').empty().text('Welcome ' + user.firstname);

    	return false;
    });



}); //end jQuery
