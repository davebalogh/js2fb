
var game = new function () {

    this.suspect = { name: '', facebookid: '' };
    this.victim = { name: '', facebookid: '' };
    this.accomplice = { name: '', facebookid: '' };
    this.witness = { name: '', facebookid: '' };

    this.falseSuspects = {
        first: { name: '', facebookid: '' },
        second: { name: '', facebookid: '' }
    };



    this.init = function (response) {

        game.writeName(response.id, response.first_name);
        setTimeout('game.writeFirstMision()', 2000);
    };

    this.writeName = function (id, first_name) {
        $('#fb_img').attr('src', 'http://graph.facebook.com/' + id + '/picture?type=large');
        $('#header_text').html('Hola detective ' + first_name);
        $('#header_text').jTypeWriter();
    };

    this.writeFirstMision = function () {

        js2fb.friend.getListByLimit(null, 50, function (response) {
            var suspect = game.randomToN(response.length - 1);
            var victim = game.randomToN(response.length - 1);
            var accomplice = game.randomToN(response.length - 1);
            var witness = game.randomToN(response.length - 1);

            var falseSuspects_01 = game.randomToN(response.length - 1);
            var falseSuspects_02 = game.randomToN(response.length - 1);

            game.suspect.name = response[suspect].name;
            game.victim.name = response[victim].name;
            game.accomplice.name = response[accomplice].name;
            game.witness.name = response[witness].name;
            game.falseSuspects.first.name = response[falseSuspects_01].name;
            game.falseSuspects.second.name = response[falseSuspects_02].name;

            game.suspect.facebookid = response[suspect].uid;
            game.victim.facebookid = response[victim].uid;
            game.accomplice.facebookid = response[accomplice].uid;
            game.witness.facebookid = response[witness].uid;
            game.falseSuspects.first.facebookid = response[falseSuspects_01].uid;
            game.falseSuspects.second.facebookid = response[falseSuspects_02].uid;

            $('#right_title').html('***********  FLASH  ***********');

            $('#right_text').append($.format('Te informamos que %s ha secuestrado a %s, con la ayuda de alguno de tus amigos.', [game.suspect.name, game.victim.name]));
            $('#right_text').append($.format('Tu tarea es investigar a cada uno de los sospechosos para capturar a %s, y liberar a %s.', [game.suspect.name, game.victim.name]));
            $('#right_text').jTypeWriter();
        });

    };

    this.writeLead = function () {
        $('#messagebox').show();

        js2fb.user.getStatus(game.accomplice.facebookid, function (response) {
            $('#messageText').html($.format('%s ha escuchado que el complice de %s posee el siguiente status: "%s"', [game.witness.name, game.suspect.name, response[0].message]));
            $('#messageText').jTypeWriter();
        });
    };

    this.showSuspects = function () {
        $('#suspect_01').attr('src', 'http://graph.facebook.com/' + game.falseSuspects.first.facebookid + '/picture');
        $('#suspect_02').attr('src', 'http://graph.facebook.com/' + game.falseSuspects.second.facebookid + '/picture');
        $('#suspect_03').attr('src', 'http://graph.facebook.com/' + game.accomplice.facebookid + '/picture');

        $('#suspect_01').attr('title', game.falseSuspects.first.name);
        $('#suspect_02').attr('title', game.falseSuspects.second.name);
        $('#suspect_03').attr('title', game.accomplice.name);

        $('#suspect_01_button').click(function () {
            game.showUser(game.falseSuspects.first);
        });
        $('#suspect_02_button').click(function () {
            game.showUser(game.falseSuspects.second);
        });
        $('#suspect_03_button').click(function () {
            game.showUser(game.accomplice);
        });


        $('#messageFriends').show();
        $('#friendsText').html('¿A qui&eacute;n de los siguientes sospechosos deseas interrogar?');
        $('#friendsText').jTypeWriter();
    };

    this.showUser = function (user) {

        $('#messageFriends').hide();
        $('#right_text').html('');
        $('#fb_img').attr('src', 'http://graph.facebook.com/' + user.facebookid + '/picture?type=large');
        $('#header_text').html(user.name);
        $('#header_text').jTypeWriter();

        if (user.facebookid == game.accomplice.facebookid) {
            $('#right_text').html($.format('Felicitaciones, has descubierto al complice de %s, y pudiste rescatar a %s.', [game.suspect.name, game.victim.name]));
        }
        else {
            $('#right_text').html($.format('Vuelve a intentarlo, %s no es complice de %s, debes seguir investigando para poder liberar a %s.', [user.name, game.suspect.name, game.victim.name]));
        }

        $('#right_text').jTypeWriter();
    };

    this.randomToN = function (maxVal) {
        var randVal = Math.random() * maxVal;
        return Math.round(randVal);
    };


}