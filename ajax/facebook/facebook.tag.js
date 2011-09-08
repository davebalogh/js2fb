
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
};