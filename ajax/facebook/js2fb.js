
var js2fb = new function () {

    //private properties
    var helper = facebook_helper;
    var user = facebook_user;
    var album = facebook_album;
    var friend = facebook_friend;
    var enums = facebook_enums;
    var event = facebook_event;
    var page = facebook_page;
    var video = facebook_video;
    var photo = facebook_photo;
    var tag = facebook_tag;
    var publish = facebook_publish;

    //getters
    this.helper = helper;
    this.user = user;
    this.album = album;
    this.friend = friend;
    this.enums = enums;
    this.event = event;
    this.page = page;
    this.video = video;
    this.photo = photo;
    this.tag = tag;
    this.publish = publish;

    this.appId = '';

    this.loginEvent = function(parameters) {
        //do nothing
    };


    //función que se debe llamar inicialmente para cargar la app e inicilizar las clases de FB
    this.initAndLogin = function (appId) {
        js2fb.appId = appId;
        FB.init({
            appId: appId,
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true  // parse XFBML
        });
        FB.Event.subscribe('auth.login', function (responseLogin) {
            helper.makeLoginActions();
            js2fb.helper.createAndExectuteCallBack(js2fb.loginEvent, responseLogin);
        });
        
        if (FB.getSession() != null) {

            helper.makeLoginActions(); ;
        }
        else {
            helper.makeLogoutActions();
        }

    };



    //logout
    this.logout = function () {
        FB.logout(function (response) {
            // user is now logged out

            helper.makeLogoutActions();
        });
    };

    //redirect to put in a iframe in facebook
    this.redirectToPerms = function (appId, next, perms) {
        var uri = "https://www.facebook.com/login.php?api_key=%s&cancel_url=&display=page&fbconnect=1&next=%s&return_session=1&session_version=3&v=1.0&req_perms=%s";
        top.location.href = $.format(uri, [appId, next, perms]);
    };
};