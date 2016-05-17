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

  $('.your-class').slick({
    // setting-name: setting-value
    // breaks when above line is on
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
