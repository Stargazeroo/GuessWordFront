//animation used in this app

//animation while loading Login page
function loginPageLoad() {
    $("#logInForm").hide().fadeIn(4000);
    $("#welcomeWords  h2").lettering('words').children("span").lettering().children("span").lettering();
    $('#logInForm input').css({
        "background": "linear-gradient(to bottom, #e1ffff 0%,#e1ffff 7%,#e1ffff 12%,#fdffff 12%,#e6f8fd 30%,#c8eefb 54%,#bee4f8 75%,#b1d8f5 100%)",
        "width": "170px"
    });
    $('#submitButton').css({
        "width" : "100%",
        "padding" : "2px 0px",
        "letter-spacing":"2px",
        "font-weight" : "bold",
        "margin-top" : "2px"
    });
}

//animation while loading Registration page
function regPageLoad() {
    $("#regForm").hide().fadeIn(2000);
    $('#regForm input').css({
        "background": "linear-gradient(to bottom, #e1ffff 0%,#e1ffff 7%,#e1ffff 12%,#fdffff 12%,#e6f8fd 30%,#c8eefb 54%,#bee4f8 75%,#b1d8f5 100%)",
        "width": "200px"
    });
    $('#reg_button').css({
        "width" : "100%",
        "padding" : "5px 0px",
        "margin-top" : "5px"
    });
};

//animations on Main page
function mainSectionLoad() {
    $("#mainSection").hide().fadeIn(2000);
    $('#sk').addClass("skAppear").css({
        right: "510px",
        top:  "109px"
    })
}

//animation while loading trainingStart page
function trainingStartPageLoad() {
    $("#trainingStartPage").hide().fadeIn(2000);
}

//user section animations
function userSectionLoad() {
    $("#userSection").css("opacity", 0.1).animate({
        opacity: 1
    }, 1500);
}
function accordion() {
	//setting jquery ui-accordion
    $("#accordion").accordion({
        autoHeight: false,
        collapsible: true,
        active: (window.location.href === "http://guessword.com/#training")? 1:0,
        icons: { "header": "defaultIcon", "activeHeader": "selectedIcon" } 
    });
}