
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
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene un album a partir del object_id
    //perms: user_photos, friends_photos
    this.get = function (objid, functionCallBack) {
        var query = $.format('SELECT object_id, owner, cover_object_id, name, created, description, size FROM album WHERE object_id = %d', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };


    //obtiene el listado de albumes de los amigos de un usuario, retorna un array con objetos de tipo album
    //perms: user_photos, friends_photos
    this.getListFromFriends = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT aid, object_id, owner, cover_object_id, name, created, description, size FROM album WHERE owner in (SELECT uid2 FROM friend WHERE uid1 =  %d) LIMIT 500', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
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
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene el listado de eventos creados por un usuario, retorna un array con objetos de tipo event.
    //perms: user_events, friends_events
    this.getListCreated = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT eid, name, pic, description, start_time, end_time, creator, location FROM event WHERE creator = %d', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };


    //obtiene el listado de eventos de un usuario, filtrando por status: enums.eventStatus
    //perms: user_events, friends_events
    this.getListByStatus = function (facebookid, rsvp_status, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT eid, name, pic, description, start_time, end_time, creator, location FROM event WHERE eid in (SELECT eid FROM event_member where rsvp_status=\'%s\' and uid = %d)', [rsvp_status,objid]);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //retorna listado de miembros de un evento
    //perms: user_events, friends_events
    this.getMembers = function (eventid, functionCallBack) {
        var query = $.format('SELECT uid, first_name, last_name, name, sex, username FROM user WHERE uid in (SELECT uid from event_member where eid=%d)', eventid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //retorna listado de miembros de un evento, filtrando por status de enums.eventStatus
    //perms: user_events, friends_events
    this.getMembersByStatus = function (eventid, rsvp_status, functionCallBack) {
        var query = $.format('SELECT uid, first_name, last_name, name, sex, username FROM user WHERE uid in (SELECT uid from event_member where eid=%d and rsvp_status=\'%s\')', [eventid, rsvp_status]);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //retorna listado de eventos creados por amigos
    //perms: user_events, friends_events
    this.getListCreatedFromFriends = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT eid, name, pic, description, start_time, end_time, creator, location FROM event WHERE creator in (SELECT uid2 FROM friend WHERE uid1=%d)', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //retorna listado de eventos a los cuales fueron invitados amigos
    //perms: user_events, friends_events
    this.getListFromFriends = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT eid, name, pic, description, start_time, end_time, creator, location FROM event WHERE eid in (SELECT eid from event_member where uid in (SELECT uid2 FROM friend WHERE uid1=%d))', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //retorna listado de eventos a los cuales fueron invitados amigos y ademas filtra por status: enums.eventStatus
    //perms: user_events, friends_events
    this.getListFromFriendsByStatus = function (facebookid, rsvp_status, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT eid, name, pic, description, start_time, end_time, creator, location FROM event WHERE eid in (SELECT eid from event_member where rsvp_status=\'%s\' and uid in (SELECT uid2 FROM friend WHERE uid1=%d))', [rsvp_status,objid]);
        js2fb.helper.callFqlQuery(query, functionCallBack);
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
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene el listado de amigos de un usuario, filtrando por sexo
    //perms: basic, user_relationships, friends_relationships
    this.getListBySex = function (facebookid, sex, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT uid, first_name, last_name, name, sex, username, relationship_status FROM user WHERE sex=\'%s\' and uid in (SELECT uid2 FROM friend WHERE uid1=%d)', [sex, objid]);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene el listado de amigos de un usuario, filtrando por relationship_status
    //perms: basic, user_relationships, friends_relationships
    this.getListByRelationshipStatus = function (facebookid, relationship_status, functionCallBack) {
        //var args = arguments;
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT uid, first_name, last_name, name, sex, username, relationship_status FROM user WHERE relationship_status=\'%s\' and uid in (SELECT uid2 FROM friend WHERE uid1=%d)', [relationship_status, objid]);
        js2fb.helper.callFqlQuery(query, functionCallBack);
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
var facebook_page = new function () {

    //fql reference doc
    this.getReferenceUri = function () {
        return ["http://developers.facebook.com/docs/reference/fql/page/", "http://developers.facebook.com/docs/reference/fql/page_fan/", "http://developers.facebook.com/docs/reference/fql/page_admin/"];
    };

    //obtiene el listado de pages de la cual el usuario es fan
    //perms: user_likes, friends_likes
    //perms_desc: Provides access to the list of all of the pages the user has liked as the likes connection.
    //pic_small: The URL to the small-sized picture for the Page being queried. The image can have a maximum width of 50px and a maximum height of 150px. This URL may be blank.
    //pic_big: The URL to the large-sized profile picture for the Page being queried. The image can have a maximum width of 200px and a maximum height of 600px. This URL may be blank.
    //pic_square: The URL to the square profile picture for the Page being queried. The image can have a maximum width and height of 50px. This URL may be blank.
    //pic: The URL to the medium-sized profile picture for the Page being queried. The image can have a maximum width of 100px and a maximum height of 300px. This URL may be blank.
    //pic_large: The URL to the largest-sized profile picture for the Page being queried. The image can have a maximum width of 396px and a maximum height of 1188px. This URL may be blank.
    this.getList = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT page_id, name, pic, page_url, fan_count, website, mission, products, location FROM page WHERE page_id = (SELECT page_id FROM page_fan where uid=%d)', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene el listado de pages de la cual el usuario es administrador
    //perms: user_likes, friends_likes, manage_pages
    this.getListAdmin = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT page_id, name, pic, page_url, fan_count, website, mission, products, location FROM page WHERE page_id = (SELECT page_id FROM page_admin where uid=%d)', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene el listado de pages de mis amigos
    //perms: user_likes, friends_likes, manage_pages
    this.getListFromFriends = function (functionCallBack) {
        var objid = FB.getSession().uid;
        var query = $.format('SELECT page_id, name, pic, page_url, fan_count, website, mission, products, location FROM page WHERE page_id = (SELECT page_id FROM page_fan where uid in (SELECT uid2 FROM friend WHERE uid1=%d))', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

};﻿
var facebook_photo = new function () {

    //fql reference doc
    this.getReferenceUri = function () {
        return "http://developers.facebook.com/docs/reference/fql/photo/";
    };

    //obtiene el listado de fotos de un usuario
    //perms: user_photos, friend_photos
    //perms_desc: 	Provides access to the photos the user has uploaded, and photos the user has been tagged in.
    this.getList = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT pid, aid, owner, src_small, src_small_height, src_small_width, src_big, src_big_height, src_big_width, src, src_height, src_width, linkcaption, created, object_id FROM photo WHERE owner = %d', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene el listado de videos de mis amigos
    //perms: user_videos, friend_videos
    this.getListFromFriends = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT pid, aid, owner, src_small, src_small_height, src_small_width, src_big, src_big_height, src_big_width, src, src_height, src_width, linkcaption, created, object_id FROM photo WHERE owner in ( SELECT uid2 FROM friend where uid1 = %d)', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

};﻿
var facebook_tag = new function () {

    //fql reference doc
    this.getReferenceUri = function () {
        return ["http://developers.facebook.com/docs/reference/fql/photo_tag/", "http://developers.facebook.com/docs/reference/fql/video_tag/"];
    };

    //    To read the photo_tag table you need the following permissions:
    //    User:
    //        user_photos permissions to access photo tag information that a user is tagged in.
    //        friends_photos permissions to access photo tag information that a friend is tagged in.
    //    Group:
    //        any valid access_token to access photo tags of a public group.
    //        user_photos permissions to access photo tags of a user for a non-public group that the current user is a member of.
    //        friends_photos permissions to access photo tags of a friend for a non-public group that the current user is a member of.
    //    Event:
    //        any valid access_token to access photo tags of a public event.
    //        user_photos permissions to access photo tags of a user for a non-public event that the current user has been invited to. If the invited user removes the event from their list they will no longer be able to read the table.
    //        friends_photos permissions to access photo tags of a friend for a non-public event that the current user has been invited to. If the invited user removes the event from their list they will no longer be able to read the table.
    //    
    //    You can also use the photo_tag FQL table to query for photos associated with a group (given its gid) or event (given its eid). See below for sample queries on how to do this.
    

    //obtiene el listado de fotos en las cuales se encuentra un tag del usuario
    this.getListOfPhotos = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT pid, aid, owner, src_small, src_small_height, src_small_width, src_big, src_big_height, src_big_width, src, src_height, src_width, linkcaption, created, object_id FROM photo WHERE pid in (SELECT pid FROM photo_tag WHERE subject = %d)', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene el listado de fotos en las cuales se encuentra un tag de los amigos del usuario logueado
    this.getListOfPhotos = function (functionCallBack) {
        var objid = FB.getSession().uid;
        var query = $.format('SELECT pid, aid, owner, src_small, src_small_height, src_small_width, src_big, src_big_height, src_big_width, src, src_height, src_width, linkcaption, created, object_id FROM photo WHERE pid in (SELECT pid FROM photo_tag WHERE subject in (SELECT uid2 FROM friend WHERE uid1 =  %d))', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };


    //    To read video_tag you need
    //
    //    Any valid access_token for Page owned videos
    //    user_videos permissions for all videos owned by the user (including nonpublic videos)
    //    friend_videos permissions for videos owned by the user's friends (including nonpublic videos that the friend has allowed the user to view)


    //obtiene el listado de videos en las cuales se encuentra un tag del usuario
    this.getListOfPhotos = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT vid, owner, album_id, title, description, link, thumbnail_link, embed_html, created_time, length, src, src_hq FROM video WHERE vid in (SELECT vid FROM video_tag WHERE subject = %d)', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene el listado de videos en las cuales se encuentra un tag de los amigos del usuario logueado
    this.getListOfPhotos = function (functionCallBack) {
        var objid = FB.getSession().uid;
        var query = $.format('SELECT vid, owner, album_id, title, description, link, thumbnail_link, embed_html, created_time, length, src, src_hq FROM video WHERE vid in (SELECT vid FROM video_tag WHERE subject in (SELECT uid2 FROM friend WHERE uid1 =  %d))', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
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

};﻿
var facebook_video = new function () {

    //fql reference doc
    this.getReferenceUri = function () {
        return "http://developers.facebook.com/docs/reference/fql/video/";
    };

    //obtiene el listado de videos de un usuario
    //perms: user_videos, friend_videos
    //perms_desc: Provides access to the videos the user has uploaded, and videos the user has been tagged in.
    this.getList = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT vid, owner, album_id, title, description, link, thumbnail_link, embed_html, created_time, length, src, src_hq FROM video WHERE owner = %d', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };

    //obtiene el listado de videos de mis amigos
    //perms: user_videos, friend_videos
    this.getListFromFriends = function (functionCallBack) {
        var objid = FB.getSession().uid;
        var query = $.format('SELECT vid, owner, album_id, title, description, link, thumbnail_link, embed_html, created_time, length, src, src_hq FROM video WHERE owner in ( SELECT uid2 FROM friend where uid1 = %d)', objid);
        js2fb.helper.callFqlQuery(query, functionCallBack);
    };


};﻿
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