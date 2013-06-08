if ($(this).hasClass('name')) {
	if ({
		var userNm = /^[a-zA-Z0-9]+$/;
		return userNm.test(this)}) {} else {
		alert('Incorect User Name');
	};
};
/*if ($(this).hasClass('password') && $(this).value() && $(this).next().value()) {

}*/
if ($(this).hasClass('mail')) {
	if ({
		var mailVal = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return mailVal.test(this);
} else {
	alert('Incorrect email adress, please enter correct email');
};
	});
};