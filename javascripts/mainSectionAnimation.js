$(document).ready(function() {
    $(function() {
        $("div#mainSection a ").hover(function() {
            var el = this;
            $(this).addClass('rotate').css("background-image", "linear-gradient(to bottom, #1C3368, #494B54)");
            setTimeout(function() {
                $(el).removeClass('rotate').css("background-image", "linear-gradient(to bottom, #494B54, #1C3368)");
            }, 2000);
        });
    });
});