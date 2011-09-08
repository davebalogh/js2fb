
var facebook_user = new function () {

    //fql reference doc
    this.getReferenceUri = function () {
        return "http://developers.facebook.com/docs/reference/fql/user/";
    };

    //private properties
    var facebookMe;

    //retorna el usuario logueado, debe llamarse luego de la función loadMe()
    //perms: basic
    this.me = function () {
        if (FB.getSession() == null) {
            facebookMe = null;
        }
        return facebookMe;
    };


    //carga los datos básicos del usuario logueado
    //perms: basic, email, user_birthday, user_relationships, user_about_me, user_activities, user_interests, user_relationships
    this.loadMe = function (functionCallBack) {
        if (FB.getSession() != null) {
            FB.api('/me', function (response) {
                facebookMe = response;
                js2fb.helper.createAndExectuteCallBack(functionCallBack, response);
            });
        }
        else {
            js2fb.helper.newException('the session is null');
        }

    };

    //obtiene el último status publicado en facebook de un usuario determinado, si se pasa null, retorna el status del usuario logueado
    //perms: user_status, friends_status
    //perms_desc: Provides access to the users most recent status message
    this.getStatus = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT uid, message FROM status WHERE uid = %d LIMIT 1', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene la cantidad de status que ha escrito un usuario o el usuario logueado.
    //perms: user_status, friends_status
    //perms_desc: Provides access to the user's most recent status message
    this.getStatusCount = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT status_id FROM status WHERE uid = %d ', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene el listado de amigos de un usuario especifico
    //perms: basic, user_relationships, user_birthday, friend_birthday
    this.get = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT uid, first_name, last_name, name, sex, username, relationship_status, birthday FROM user WHERE uid=%d', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //retorna url de imagen de 50x50 sin necesidad de estar logueado.
    this.getPicture = function (facebookid) {
        return $.format("http://graph.facebook.com/%d/picture", facebookid);
    };

};