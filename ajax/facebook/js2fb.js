
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