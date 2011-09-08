
var facebook_album = new function () {

    //fql reference doc
    this.getReferenceUri = function () {
        return "http://developers.facebook.com/docs/reference/fql/album/";
    };

    //obtiene el listado de albumes de un usuario, retorna un array con objetos de tipo album
    //perms: user_photos, friends_photos
    //perms_desc: Provides access to the photos the user has uploaded, and photos the user has been tagged in.
    this.getList = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT aid, object_id, owner, cover_object_id, name, created, description, size FROM album WHERE owner = %d', objid);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene un album a partir del object_id
    //perms: user_photos, friends_photos
    this.get = function (objid, functionCallBack) {
        var query = $.format('SELECT object_id, owner, cover_object_id, name, created, description, size FROM album WHERE object_id = %d', objid);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };


    //obtiene el listado de albumes de los amigos de un usuario, retorna un array con objetos de tipo album
    //perms: user_photos, friends_photos
    this.getListFromFriends = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT aid, object_id, owner, cover_object_id, name, created, description, size FROM album WHERE owner in (SELECT uid2 FROM friend WHERE uid1 =  %d) LIMIT 500', objid);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };

};﻿
var facebook_enums = new function () {

    //fql reference doc

    this.sex = {
        male: 'male',
        female: 'female'
    };

    //fql reference doc
    this.relationShipStatus = {
        Single: 'Single',
        In_a_Relationship: 'In a Relationship',
        In_an_Open_Relationship: 'In an Open Relationship',
        Engaged: 'Engaged',
        Married: 'Married',
        It_is_Complicated: 'It\'is Complicated',
        Widowed: 'Widowed'
    };

    this.eventStatus = {
        attending: 'attending',
        unsure: 'unsure',
        declined: 'declined',
        not_replied: 'not_replied'
    };
};﻿
var facebook_event = new function () {

    //fql reference docs: event and event_member
    this.getReferenceUri = function () {
        return ["http://developers.facebook.com/docs/reference/fql/event/", "http://developers.facebook.com/docs/reference/fql/event_member/"];
    };

    //obtiene el listado de eventos de un usuario, retorna un array con objetos de tipo event 
    //perms: user_events, friends_events
    //perms_desc: Provides access to the list of events the user is attending as the events connection.
    //pic_small: The URL to the small-sized profile picture for the event being queried. The image can have a maximum width of 50px and a maximum height of 150px. This URL may be blank.
    //pic_big: The URL to the largest-sized profile picture for the event being queried. The image can have a maximum width of 200px and a maximum height of 600px. This URL may be blank.
    //pic: The URL to the medium-sized profile picture for the event being queried. The image can have a maximum width of 100px and a maximum height of 300px. This URL may be blank.
    this.getList = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT eid, name, pic, description, start_time, end_time, creator, location FROM event WHERE eid in (SELECT eid FROM event_member where uid = %d)', objid);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene el listado de eventos creados por un usuario, retorna un array con objetos de tipo event.
    //perms: user_events, friends_events
    this.getListCreated = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT eid, name, pic, description, start_time, end_time, creator, location FROM event WHERE creator = %d', objid);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };


    //obtiene el listado de eventos de un usuario, filtrando por status: enums.eventStatus
    //perms: user_events, friends_events
    this.getListByStatus = function (facebookid, rsvp_status, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT eid, name, pic, description, start_time, end_time, creator, location FROM event WHERE eid in (SELECT eid FROM event_member where rsvp_status=\'%s\' and uid = %d)', [rsvp_status,objid]);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };

    //retorna listado de miembros de un evento
    //perms: user_events, friends_events
    this.getMembers = function (eventid, functionCallBack) {
        var query = $.format('SELECT uid, first_name, last_name, name, sex, username FROM user WHERE uid in (SELECT uid from event_member where eid=%d)', eventid);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };

    //retorna listado de miembros de un evento, filtrando por status de enums.eventStatus
    //perms: user_events, friends_events
    this.getMembersByStatus = function (eventid, rsvp_status, functionCallBack) {
        var query = $.format('SELECT uid, first_name, last_name, name, sex, username FROM user WHERE uid in (SELECT uid from event_member where eid=%d and rsvp_status=\'%s\')', [eventid, rsvp_status]);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };

    //retorna listado de eventos creados por amigos
    //perms: user_events, friends_events
    this.getListCreatedFromFriends = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT eid, name, pic, description, start_time, end_time, creator, location FROM event WHERE creator in (SELECT uid2 FROM friend WHERE uid1=%d)', objid);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };

    //retorna listado de eventos a los cuales fueron invitados amigos
    //perms: user_events, friends_events
    this.getListFromFriends = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT eid, name, pic, description, start_time, end_time, creator, location FROM event WHERE eid in (SELECT eid from event_member where uid in (SELECT uid2 FROM friend WHERE uid1=%d))', objid);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };

    //retorna listado de eventos a los cuales fueron invitados amigos y ademas filtra por status: enums.eventStatus
    //perms: user_events, friends_events
    this.getListFromFriendsByStatus = function (facebookid, rsvp_status, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT eid, name, pic, description, start_time, end_time, creator, location FROM event WHERE eid in (SELECT eid from event_member where rsvp_status=\'%s\' and uid in (SELECT uid2 FROM friend WHERE uid1=%d))', [rsvp_status,objid]);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };
    
};﻿
var facebook_friend = new function () {

    //fql reference doc
    this.getReferenceUri = function () {
        return "http://developers.facebook.com/docs/reference/fql/friend/";
    };

    //obtiene el listado de amigos de un usuario especifico
    //perms: basic, user_relationships, friends_relationships
    this.getList = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT uid, first_name, last_name, name, sex, username, relationship_status FROM user WHERE uid in (SELECT uid2 FROM friend WHERE uid1=%d)', objid);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene el listado de amigos de un usuario, filtrando por sexo
    //perms: basic, user_relationships, friends_relationships
    this.getListBySex = function (facebookid, sex, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT uid, first_name, last_name, name, sex, username, relationship_status FROM user WHERE sex=\'%s\' and uid in (SELECT uid2 FROM friend WHERE uid1=%d)', [sex, objid]);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene el listado de amigos de un usuario, filtrando por relationship_status
    //perms: basic, user_relationships, friends_relationships
    this.getListByRelationshipStatus = function (facebookid, relationship_status, functionCallBack) {
        //var args = arguments;
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT uid, first_name, last_name, name, sex, username, relationship_status FROM user WHERE relationship_status=\'%s\' and uid in (SELECT uid2 FROM friend WHERE uid1=%d)', [relationship_status, objid]);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };
};﻿
var facebook_helper = new function () {
    //private properties
    var loginButtonId = '';
    var logoutButtonId = '';

    //setters and getters
    this.setLoginButtonId = function (setter) { loginButtonId = setter; };
    this.getLoginButtonId = function () { return loginButtonId; };

    this.setLogoutButtonId = function (setter) { logoutButtonId = setter; };
    this.getLogoutButtonId = function () { return logoutButtonId; };


    //public functions
    //función generica para realizar consultas fql a las tablas de facebook
    this.callFqlQuery = function (query, functionCallBack) {
        if (FB.getSession() != null) {
            FB.api({ method: 'fql.query',
                query: query
            }, function (response) { facebook_helper.createAndExectuteCallBack(functionCallBack, response); });
        }
        else {
            facebook_helper.newException('the session is null');
        }
    };

    //conjunto de acciones a disparar cuando un usuario se loguee, o haga refresh en la pagina y se encuentre logueado
    this.makeLoginActions = function () {
        if (facebook_helper.getLoginButtonId() != '')
            $('#' + facebook_helper.getLoginButtonId()).hide();

        if (facebook_helper.getLogoutButtonId() != '')
            $('#' + facebook_helper.getLogoutButtonId()).show();
    };

    //acciones a realizar cuando el usuario presiona el boton de logout. El mismo hace logoff del sitio y de facebook
    this.makeLogoutActions = function () {
        if (facebook_helper.getLoginButtonId() != '')
            $('#' + facebook_helper.getLoginButtonId()).show();

        if (facebook_helper.getLogoutButtonId() != '')
            $('#' + facebook_helper.getLogoutButtonId()).hide();
    };

    //funcionalidad para llamar a acciones una vez finalizadas las llamadas a la api de facebook
    this.createAndExectuteCallBack = function (functionCallBack, response) {
        if (functionCallBack && typeof (functionCallBack) === "function") {
            var newInstance = function (resp) { };
            newInstance = functionCallBack;
            newInstance(response);
        }

    };

    //excepciones llamadas de funciones para dar avisos o para hacer debug de la app
    this.newException = function (msg) {
        alert(msg);
    };

    //helper para calcular edad del usuario en base a su fecha de nacimiento
    this.calculateAge = function (birthday) {

        var myDOB = birthday.split('/');
        var myDate = myDOB[1];
        var myMonth = myDOB[0];
        var myYear = myDOB[2];


        var age = "";
        var now = new Date();
        var todayDate = now.getDate();
        var todayMonth = now.getMonth();
        var todayYear = now.getFullYear();

        if (myDate <= todayDate) {
            if (myMonth <= todayMonth)
                age = todayYear - myYear;
            else if (myMonth > todayMonth)
                age = todayYear - myYear - 1;
        }
        else if (myDate > todayDate) {
            if (myMonth < todayMonth)
                age = todayYear - myYear - 1;
            else
                age = todayYear - myYear - 1;
        }
        return age;
    };

    //calcula mes de nacimiento pasado a texto
    this.calculateMonth = function (birthday) {
        var myDOB = birthday.split('/');
        var myMonth = myDOB[0];
        var monthName = '';
        switch (myMonth) {
            case '01': monthName = 'Enero';
                break;
            case '02': monthName = 'Febrero';
                break;
            case '03': monthName = 'Marzo';
                break;
            case '04': monthName = 'Abril';
                break;
            case '05': monthName = 'Mayo';
                break;
            case '06': monthName = 'Junio';
                break;
            case '07': monthName = 'Julio';
                break;
            case '08': monthName = 'Agosto';
                break;
            case '09': monthName = 'Septiembre';
                break;
            case '10': monthName = 'Octubre';
                break;
            case '11': monthName = 'Noviembre';
                break;
            case '12': monthName = 'Diciembre';
                break;
        }
        return monthName;
    };

    //calcula año de nacimiento
    this.calculateYear = function (birthday) {
        var myDOB = birthday.split('/');
        var myYear = myDOB[2];

        if (!myYear)
            myYear = 0;

        return myYear;
    };

};﻿
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
                SimpleFBJs.helper.createAndExectuteCallBack(functionCallBack, response);
            });
        }
        else {
            SimpleFBJs.helper.newException('the session is null');
        }

    };

    //obtiene el último status publicado en facebook de un usuario determinado, si se pasa null, retorna el status del usuario logueado
    //perms: user_status, friends_status
    //perms_desc: Provides access to the users most recent status message
    this.getStatus = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT uid, message FROM status WHERE uid = %d LIMIT 1', objid);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene la cantidad de status que ha escrito un usuario o el usuario logueado.
    //perms: user_status, friends_status
    //perms_desc: Provides access to the user's most recent status message
    this.getStatusCount = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT status_id FROM status WHERE uid = %d ', objid);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene el listado de amigos de un usuario especifico
    //perms: basic, user_relationships, user_birthday, friend_birthday
    this.get = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT uid, first_name, last_name, name, sex, username, relationship_status, birthday FROM user WHERE uid=%d', objid);
        SimpleFBJs.helper.callFqlQuery(query, functionCallBack);
    };

    //retorna url de imagen de 50x50 sin necesidad de estar logueado.
    this.getPicture = function (facebookid) {
        return $.format("http://graph.facebook.com/%d/picture", facebookid);
    };

};﻿
var SimpleFBJs = new function () {

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