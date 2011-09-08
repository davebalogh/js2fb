
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
    
};