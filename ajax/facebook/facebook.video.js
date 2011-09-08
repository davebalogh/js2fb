
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


};