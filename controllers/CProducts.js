//const StringUtil               = require("../../../../utils/StringUtil.js");
//const MidCheckOnOff            = require("../../../../middlewares/web/onOff.js");
//const MidAuth                  = require("../../../../middlewares/web/authAdmin.js");
//const WebOrganService          = require("../../../../services/web/WebOrganService.js");
//const WebCallCategService      = require("../../../../services/web/WebCallingCategoryService.js");
//const getCalledSpecificService = require("../../../../services/web/WebGetCalledSpecService.js");

// Service Call Geral
//const WebCallsCategService     = require("../../../../services/web/WebCalledService.js");

// Service for Creatian an a Call
//const WebCallOrganService      = require("../../../../services/web/WebCallOrganService.js");

module.exports = (app) => {
    
    //################################################################
    
     // Area for Called Admin Dashboard - Admin Page  
    // View Calls finished by organ
    /*app.get("/anjos/area/view/call/finished/byorgan/web", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
    
        var organId          = req.query.organId;
        var sessionUserId    = req.session.userWebSessionId;
        var sessionName      = req.session.userName;
        var sessionTypeUser  = req.session.userType;
        var nameOrgan        = req.session.nameOrgan;
        var organType        = req.session.organType;
        var sessionCityUser  = req.session.userCity;
        var sessionStateUser = req.session.userState;

        WebCallsCategService.getAllCallsOrganFinished(organId,(error,calls) => {

            StringUtil.splitStringFirstAndLast(sessionName,(error, strSplit) => {
                res.render("./admin/private/callofschool.ejs", {
                    sessionName: strSplit,
                    sessionTypeUser: sessionTypeUser,
                    sessionCityUser : sessionCityUser,
                    sessionStateUser: sessionStateUser,
                    sessionUserId: sessionUserId,
                    nameOrgan: nameOrgan,
                    organType: organType,
                    colorStatus: 'green',
                    status: 'Finalizado',
                    // Chamados abertos para um órgão em específico
                    call: calls
                    //----------------------------------------------
                });
            }); 

        }); 

    }); */
    //======================================================================================================================
    
}