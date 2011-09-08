
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

};