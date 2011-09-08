
var js2fb = new function () {

    //private properties
    var helper = facebook_helper;
    var user = facebook_user;
    var album = facebook_album;
    var friend = facebook_friend;
    var enums = facebook_enums;
    var event = facebook_event;

    //getters
    this.helper = helper;
    this.user = user;
    this.album = album;
    this.friend = friend;
    this.enums = enums;
    this.event = event;
    


    //función que se debe llamar inicialmente para cargar la app e inicilizar las clases de FB
    this.initAndLogin = function (appId) {
        FB.init({
            appId: appId,
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true  // parse XFBML
        });

        if (FB.getSession() != null) {
            FB.Event.subscribe('auth.login', function (responseLogin) {
                helper.makeLoginActions();
            });
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
};