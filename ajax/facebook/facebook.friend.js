
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
};