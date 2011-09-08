
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

};