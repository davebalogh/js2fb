
var facebook_helper = new function () {
    //private properties
    var loginButtonId = '';
    var logoutButtonId = '';

    //setters and getters
    this.setLoginButtonId = function (setter) { loginButtonId = setter; };
    this.getLoginButtonId = function () { return loginButtonId; };

    this.setLogoutButtonId = function (setter) { logoutButtonId = setter; };
    this.getLogoutButtonId = function () { return logoutButtonId; };


    //public functions
    //función generica para realizar consultas fql a las tablas de facebook
    this.callFqlQuery = function (query, functionCallBack) {
        if (FB.getSession() != null) {
            FB.api({ method: 'fql.query',
                query: query
            }, function (response) { facebook_helper.createAndExectuteCallBack(functionCallBack, response); });
        }
        else {
            facebook_helper.newException('the session is null');
        }
    };

    //conjunto de acciones a disparar cuando un usuario se loguee, o haga refresh en la pagina y se encuentre logueado
    this.makeLoginActions = function () {
        if (facebook_helper.getLoginButtonId() != '')
            $('#' + facebook_helper.getLoginButtonId()).hide();

        if (facebook_helper.getLogoutButtonId() != '')
            $('#' + facebook_helper.getLogoutButtonId()).show();
    };

    //acciones a realizar cuando el usuario presiona el boton de logout. El mismo hace logoff del sitio y de facebook
    this.makeLogoutActions = function () {
        if (facebook_helper.getLoginButtonId() != '')
            $('#' + facebook_helper.getLoginButtonId()).show();

        if (facebook_helper.getLogoutButtonId() != '')
            $('#' + facebook_helper.getLogoutButtonId()).hide();
    };

    //funcionalidad para llamar a acciones una vez finalizadas las llamadas a la api de facebook
    this.createAndExectuteCallBack = function (functionCallBack, response) {
        if (functionCallBack && typeof (functionCallBack) === "function") {
            var newInstance = function (resp) { };
            newInstance = functionCallBack;
            newInstance(response);
        }

    };

    //excepciones llamadas de funciones para dar avisos o para hacer debug de la app
    this.newException = function (msg) {
        alert(msg);
    };

    //helper para calcular edad del usuario en base a su fecha de nacimiento
    this.calculateAge = function (birthday) {

        var myDOB = birthday.split('/');
        var myDate = myDOB[1];
        var myMonth = myDOB[0];
        var myYear = myDOB[2];


        var age = "";
        var now = new Date();
        var todayDate = now.getDate();
        var todayMonth = now.getMonth();
        var todayYear = now.getFullYear();

        if (myDate <= todayDate) {
            if (myMonth <= todayMonth)
                age = todayYear - myYear;
            else if (myMonth > todayMonth)
                age = todayYear - myYear - 1;
        }
        else if (myDate > todayDate) {
            if (myMonth < todayMonth)
                age = todayYear - myYear - 1;
            else
                age = todayYear - myYear - 1;
        }
        return age;
    };

    //calcula mes de nacimiento pasado a texto
    this.calculateMonth = function (birthday) {
        var myDOB = birthday.split('/');
        var myMonth = myDOB[0];
        var monthName = '';
        switch (myMonth) {
            case '01': monthName = 'Enero';
                break;
            case '02': monthName = 'Febrero';
                break;
            case '03': monthName = 'Marzo';
                break;
            case '04': monthName = 'Abril';
                break;
            case '05': monthName = 'Mayo';
                break;
            case '06': monthName = 'Junio';
                break;
            case '07': monthName = 'Julio';
                break;
            case '08': monthName = 'Agosto';
                break;
            case '09': monthName = 'Septiembre';
                break;
            case '10': monthName = 'Octubre';
                break;
            case '11': monthName = 'Noviembre';
                break;
            case '12': monthName = 'Diciembre';
                break;
        }
        return monthName;
    };

    //calcula año de nacimiento
    this.calculateYear = function (birthday) {
        var myDOB = birthday.split('/');
        var myYear = myDOB[2];

        if (!myYear)
            myYear = 0;

        return myYear;
    };

};