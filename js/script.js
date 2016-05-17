$(function(){



$.ajax({
method: "GET",
url: "/data"
})
.done(function(info) {
console.log("DONE")
console.log(info)
})
.fail(function(err){
console.log("FAIL")
console.log(err)
});

var localstorage = {
   set:  function (key, value) {
         window.localStorage.setItem( key, JSON.stringify(value) );
         },
   get:  function (key) {
         try {
           return JSON.parse( window.localStorage.getItem(key) );
           } catch (e) {
           return null;
           }
         }
       }


localstorage.set(“key”, value);

var fName = localstorage.get(“fName”);

if (fName == "") {
  $('#welcome').append(fName);
}

});//end jQuery
