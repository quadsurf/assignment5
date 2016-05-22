
$(function() {
    $('#saveAddress').click(function() {
        var user = data.get('user');
        user.address = $("#address").val();
        user.nickname = $("#nickname").val();
        user.avg_people_line = $("#avg_people_line").val();
        user.avg_mins_line = $("#avg_mins_line").val();
        user.avg_mins_prepare = $("#avg_mins_prepare").val();
        
        updateUser(user);
    });
})