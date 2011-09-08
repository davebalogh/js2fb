
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
        SimpleFBJs.helper().callFqlQuery(query, functionCallBack);
    };

    //obtiene un album a partir del object_id
    //perms: user_photos, friends_photos
    this.get = function (objid, functionCallBack) {
        var query = $.format('SELECT object_id, owner, cover_object_id, name, created, description, size FROM album WHERE object_id = %d', objid);
        SimpleFBJs.helper().callFqlQuery(query, functionCallBack);
    };


    //obtiene el listado de albumes de los amigos de un usuario, retorna un array con objetos de tipo album
    //perms: user_photos, friends_photos
    this.getListFromFriends = function (facebookid, functionCallBack) {
        var objid = (facebookid) ? facebookid : FB.getSession().uid;
        var query = $.format('SELECT aid, object_id, owner, cover_object_id, name, created, description, size FROM album WHERE owner in (SELECT uid2 FROM friend WHERE uid1 =  %d) LIMIT 500', objid);
        SimpleFBJs.helper().callFqlQuery(query, functionCallBack);
    };

};