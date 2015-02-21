var MyMain = function () {
    $(".page").html(mainTmpl())

    $('.js-scoreboard').on("click", function () {  
        $('.page').html(scoreboardTmpl());
        $('.back').on("click", function () {
           MyMain(); 
        });
    });

    $('.js-game').on("click", function () {
        $('.page').html(gameTmpl());
        $('.back').on("click", function () {
           MyMain(); 
        });
    });

    $('.js-login').on("click", function () {
        $('.page').html(loginTmpl());
        $('.back').on("click", function () {
           MyMain(); 
        });
    });
}