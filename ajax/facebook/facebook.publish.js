
var facebook_publish = new function () {

    //fql reference doc
    this.getReferenceUri = function () {
        return "http://developers.facebook.com/docs/reference/api/";
    };

    //obtiene el listado de amigos de un usuario especifico
    //perms: publish_stream
    //perms_desc: Enables your app to post content, comments, and likes to a user's stream and to the streams of the user's friends. 
    //With this permission, you can publish content to a user's feed at any time, without requiring offline_access. However, please note that Facebook recommends a user-initiated sharing model.
    this.feed = function (message, picture, link, name, caption, description, source, functionCallBack) {
        FB.api('/me/feed', 'post', {
            message: message,
            link: link,
            name: name,
            description: description, 
            picture: picture,
            caption: caption,
            source: source
        }, 
            function (response) {
                 js2fb.helper.createAndExectuteCallBack(functionCallBack, response);
            });

    };


};