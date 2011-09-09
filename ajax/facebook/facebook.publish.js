
var facebook_publish = new function () {

    //fql reference doc
    this.getReferenceUri = function () {
        return "http://developers.facebook.com/docs/reference/api/";
    };

    //publica un mensaje en el muro del usuario logueado
    //perms: publish_stream
    //perms_desc: Enables your app to post content, comments, and likes to a user's stream and to the streams of the user's friends. 
    //With this permission, you can publish content to a user's feed at any time, without requiring offline_access. However, please note that Facebook recommends a user-initiated sharing model.
    this.feed = function (message, picture, link, name, description, functionCallBack) {
        var args = {
            message: message,
            link: link,
            name: name,
            description: description,
            picture: picture
        };
        js2fb.helper.callPublishAction('me', 'feed', args, functionCallBack);

    };
    //publica un mensaje en el muro de un usuario dependiendo el facebookid o el username
    this.feedByFacebookId = function (facebookid, message, picture, link, name, description, functionCallBack) {

        var args = {
            message: message,
            link: link,
            name: name,
            description: description,
            picture: picture
        };
        js2fb.helper.callPublishAction(facebookid, 'feed', args, functionCallBack);

    };

    //escribe un comentario en cualquiere objeto recibiendo el id del mismo.
    this.comment = function (objectid, message, functionCallBack) {

        var args = {
            message: message
        };
        js2fb.helper.callPublishAction(objectid, 'comments', args, functionCallBack);

    };

};