const StringUtil               = require("../../../../utils/StringUtil.js");
const MidCheckOnOff            = require("../../../../middlewares/web/onOff.js");
const MidAuth                  = require("../../../../middlewares/web/authAdmin.js");
const WebOrganService          = require("../../../../services/web/WebOrganService.js");
const WebCallCategService      = require("../../../../services/web/WebCallingCategoryService.js");
const getCalledSpecificService = require("../../../../services/web/WebGetCalledSpecService.js");

// Service Call Geral
const WebCallsCategService     = require("../../../../services/web/WebCalledService.js");

// Service for Creatian an a Call
const WebCallOrganService      = require("../../../../services/web/WebCallOrganService.js");

module.exports = (app) => {
    
    //################################################################
    
     // Area for Called Admin Dashboard - Admin Page  
     
     // Return data to open call a organ
     app.get("/anjos/area/called", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
        
        var sessionUserId    = req.session.userWebSessionId;
        var sessionName      = req.session.userName;
        var sessionTypeUser  = req.session.userType;
        var nameOrgan        = req.session.nameOrgan;
        var organId          = req.session.organId;
        var organType        = req.session.organType;
        var sessionCityUser  = req.session.userCity;
        var sessionStateUser = req.session.userState;
        
        // Get Organs for Called Function
        //@@@ Segregar Posteriormente em refatoção
        WebCallsCategService.getAllCallsForOrgan(organId,(error,calls) => {
            WebOrganService.getOrgansForms((error,organs) => {
                WebCallCategService.getAllCallCateg((error, callCateg) => { 

                    StringUtil.splitStringFirstAndLast(sessionName,(error, strSplit) => {

                        if(nameOrgan != null) {
                            res.render("./admin/private/called.ejs", {
                                //================================
                                // Fixed
                                sessionName: strSplit,
                                userName: sessionName,
                                sessionTypeUser: sessionTypeUser,
                                sessionCityUser : sessionCityUser,
                                sessionStateUser: sessionStateUser,
                                sessionUserId: sessionUserId,
                                nameOrgan: nameOrgan,
                                organId: organId,
                                organType: organType,
                                //==================================
                                callCateg: callCateg,
                                organ: organs,
                                // Chamados abertos para um órgão em específico
                                calls: calls 
                                //----------------------------------------------
                            });
                        }
                        else {
                                WebCallsCategService.getAllCalls((callx) => { WebCallsCategService.getAllCalls((callx) => { 
                                    res.render("./admin/private/called.ejs", {
                                        sessionName: strSplit,
                                        sessionTypeUser: sessionTypeUser,
                                        sessionCityUser : sessionCityUser,
                                        sessionStateUser: sessionStateUser,
                                        sessionUserId: sessionUserId,
                                        callCateg: callCateg,
                                        organ: organs,
                                        calls: callx
                                    });     
                        });
                    });
                    }
                    }); 

                });
                
            });
        });

    });

    // Acompanhar chamados abertos para variedade de órgãos
    app.get("/anjos/area/accompany/calls/organs", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
        
        var sessionUserId    = req.session.userWebSessionId;
        var sessionName      = req.session.userName;
        var sessionTypeUser  = req.session.userType;
        var nameOrgan        = req.session.nameOrgan;
        var organType        = req.session.organType;
        var sessionCityUser  = req.session.userCity;
        var sessionStateUser = req.session.userState;

        WebCallsCategService.getAllCallsOrganWithIdOpenedOrd((error,calls) => {

            StringUtil.splitStringFirstAndLast(sessionName,(error, strSplit) => {
                res.render("./admin/private/accompanycalls.ejs", {
                    sessionName: strSplit,
                    sessionTypeUser: sessionTypeUser,
                    sessionCityUser : sessionCityUser,
                    sessionStateUser: sessionStateUser,
                    sessionUserId: sessionUserId,
                    nameOrgan: nameOrgan,
                    organType: organType,
                    colorStatus: '#f7bf4f',
                    status: 'Aberto',
                    // Chamados abertos para um órgão em específico
                    call: calls
                    //----------------------------------------------
                });
            }); 

        }); 
    
    });
    
    // Create a Call
    app.post("/anjos/area/create/call/school/to/organ/web", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
        const { state,city, description,userName, organOriginId ,organDestinyId , callCategoryId, userId,callTypeId   } = req.body;
        const createACallToOrgan = { state, city, status: 'Aberto', description, userName, organOriginId, organDestinyId, callCategoryId, userId ,callTypeId };
        
        WebCallOrganService.createACallToOrgan(createACallToOrgan,(error,results) => {
            
            if(results == null){
                res.json({message: 'Chamado efetuado com sucesso'})
            }
            else {
                res.redirect("/anjos/area/view/call/opened/byschool/web/?organId="+organOriginId);
            }
            
        });
    });   

    // Received Call
    app.get("/anjos/area/receive/call", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
    
        var idCall         = req.query.id;
        
        WebCallsCategService.receivedCall(idCall,(error, results) => {
            res.redirect("/anjos/area/called");
        });
        
    });

    // Answer Call
    app.get("/anjos/area/answer/call", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
    
        var idCall         = req.query.id;
        
        WebCallsCategService.answerCall(idCall,(error, results) => {
            res.redirect("/anjos/area/called");
        });
        
    });
    
    // On Way Call
    app.get("/anjos/area/onway/call", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
    
        var idCall         = req.query.id;
        
        WebCallsCategService.onWayCall(idCall,(error, results) => {
            res.redirect("/anjos/area/called");
        });
        
    });

    // Forward Call
    app.get("/anjos/area/forward/call", MidCheckOnOff.checkOnOff, MidAuth.authAdminWeb , (req,res) => {
        var idCall          = req.query.id;
        var organDestinyId  = req.query.organDestinyId;
        
        WebCallsCategService.forwardCall(idCall,organDestinyId,(error, results) => {
            res.redirect("/anjos/area/called");
        });
    });

    //======================================================================================================================


    //======================================================================================================================
    // View Open calls for a specific organ
    app.get("/anjos/area/view/call/to/organ/web", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
        // Ainda está sem conteúdo a rota.
    }); 
    
    // View Open calls by id
    app.get("/anjos/area/view/call/by/id", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
        var id               = req.query.id;
        var sessionUserId    = req.session.userWebSessionId;
        var sessionName      = req.session.userName;
        var sessionTypeUser  = req.session.userType;
        var nameOrgan        = req.session.nameOrgan;
        var organType        = req.session.organType;
        var sessionCityUser  = req.session.userCity;
        var sessionStateUser = req.session.userState;

        getCalledSpecificService.getAllCallsForOrganPanel(id,(error,calls) => {
            StringUtil.splitStringFirstAndLast(sessionName,(error, strSplit) => {
                res.render("./admin/private/calledbyid.ejs", {
                    sessionName     : strSplit,
                    sessionTypeUser : sessionTypeUser,
                    sessionCityUser : sessionCityUser,
                    sessionStateUser: sessionStateUser,
                    sessionUserId   : sessionUserId,
                    nameOrgan       : nameOrgan,
                    organType       : organType,
                    calls           : calls
                });
            }); 
        });

    }); 
    //======================================================================================================================
   
    // View Calls opened by School
    app.get("/anjos/area/view/call/opened/byschool/web", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
    
        var organId          = req.query.organId;
        var sessionUserId    = req.session.userWebSessionId;
        var sessionName      = req.session.userName;
        var sessionTypeUser  = req.session.userType;
        var nameOrgan        = req.session.nameOrgan;
        var organType        = req.session.organType;
        var sessionCityUser  = req.session.userCity;
        var sessionStateUser = req.session.userState;

        WebCallsCategService.getAllCallsSchoolOpened(organId,(error,calls) => {

            StringUtil.splitStringFirstAndLast(sessionName,(error, strSplit) => {
                res.render("./admin/private/callofschool.ejs", {
                    sessionName: strSplit,
                    sessionTypeUser: sessionTypeUser,
                    sessionCityUser : sessionCityUser,
                    sessionStateUser: sessionStateUser,
                    sessionUserId: sessionUserId,
                    nameOrgan: nameOrgan,
                    organType: organType,
                    colorStatus: '#f7bf4f',
                    status: 'Aberto',
                    // Chamados abertos para um órgão em específico
                    call: calls,
                    icon: '⚠️'
                    //----------------------------------------------
                });
            }); 

        }); 

    }); 

    // View Calls received by Organ
    app.get("/anjos/area/view/call/received/byschool/web", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
    
        var organId          = req.query.organId;
        var sessionUserId    = req.session.userWebSessionId;
        var sessionName      = req.session.userName;
        var sessionTypeUser  = req.session.userType;
        var nameOrgan        = req.session.nameOrgan;
        var organType        = req.session.organType;
        var sessionCityUser  = req.session.userCity;
        var sessionStateUser = req.session.userState;

        WebCallsCategService.getAllCallsSchoolReceived(organId,(error,calls) => {

            StringUtil.splitStringFirstAndLast(sessionName,(error, strSplit) => {
                res.render("./admin/private/callofschool.ejs", {
                    sessionName: strSplit,
                    sessionTypeUser: sessionTypeUser,
                    sessionCityUser : sessionCityUser,
                    sessionStateUser: sessionStateUser,
                    sessionUserId: sessionUserId,
                    nameOrgan: nameOrgan,
                    organType: organType,
                    colorStatus: 'blue',
                    status: 'Recebido',
                    // Chamados abertos para um órgão em específico
                    call: calls,
                    icon: '🧊'
                    //----------------------------------------------
                });
            }); 

        }); 

    }); 

    // View Calls on process
    app.get("/anjos/area/view/call/onprocess/byschool/web", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
    
        var organId          = req.query.organId;
        var sessionUserId    = req.session.userWebSessionId;
        var sessionName      = req.session.userName;
        var sessionTypeUser  = req.session.userType;
        var nameOrgan        = req.session.nameOrgan;
        var organType        = req.session.organType;
        var sessionCityUser  = req.session.userCity;
        var sessionStateUser = req.session.userState;

        WebCallsCategService.getAllCallsSchoolOnProcess(organId,(error,calls) => {

            StringUtil.splitStringFirstAndLast(sessionName,(error, strSplit) => {
                res.render("./admin/private/callofschool.ejs", {
                    sessionName: strSplit,
                    sessionTypeUser: sessionTypeUser,
                    sessionCityUser : sessionCityUser,
                    sessionStateUser: sessionStateUser,
                    sessionUserId: sessionUserId,
                    nameOrgan: nameOrgan,
                    organType: organType,
                    colorStatus: 'orange',
                    status: 'Em Atendimento',
                    // Chamados abertos para um órgão em específico
                    call: calls,
                    icon: '📒'
                    //----------------------------------------------
                });
            }); 

        }); 

    }); 

    // View Calls onway
    app.get("/anjos/area/view/call/ongoing/byschool/web", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
    
        var organId          = req.query.organId;
        var sessionUserId    = req.session.userWebSessionId;
        var sessionName      = req.session.userName;
        var sessionTypeUser  = req.session.userType;
        var nameOrgan        = req.session.nameOrgan;
        var organType        = req.session.organType;
        var sessionCityUser  = req.session.userCity;
        var sessionStateUser = req.session.userState;

        WebCallsCategService.getAllCallsSchoolOnGoing(organId,(error,calls) => {

            StringUtil.splitStringFirstAndLast(sessionName,(error, strSplit) => {
                res.render("./admin/private/callofschool.ejs", {
                    sessionName: strSplit,
                    sessionTypeUser: sessionTypeUser,
                    sessionCityUser : sessionCityUser,
                    sessionStateUser: sessionStateUser,
                    sessionUserId: sessionUserId,
                    nameOrgan: nameOrgan,
                    organType: organType,
                    colorStatus: 'blue',
                    status: 'A caminho',
                    // Chamados abertos para um órgão em específico
                    call: calls,
                    icon: '🚘'
                    //----------------------------------------------
                });
            }); 

        }); 

    }); 

    // View Calls finished by organ
    app.get("/anjos/area/view/call/finished/byschool/web", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
    
        var organId          = req.query.organId;
        var sessionUserId    = req.session.userWebSessionId;
        var sessionName      = req.session.userName;
        var sessionTypeUser  = req.session.userType;
        var nameOrgan        = req.session.nameOrgan;
        var organType        = req.session.organType;
        var sessionCityUser  = req.session.userCity;
        var sessionStateUser = req.session.userState;

        WebCallsCategService.getAllCallsSchoolFinished(organId,(error,calls) => {

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
                    call: calls,
                    icon: '✅'
                    //----------------------------------------------
                });
            }); 

        }); 

    }); 
    //======================================================================================================================
    // View Calls opened by Organ
    app.get("/anjos/area/view/call/opened/byorgan/web", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
    
        var organId          = req.query.organId;
        var sessionUserId    = req.session.userWebSessionId;
        var sessionName      = req.session.userName;
        var sessionTypeUser  = req.session.userType;
        var nameOrgan        = req.session.nameOrgan;
        var organType        = req.session.organType;
        var sessionCityUser  = req.session.userCity;
        var sessionStateUser = req.session.userState;

        WebCallsCategService.getAllCallsOrganOpened(organId,(error,calls) => {

            StringUtil.splitStringFirstAndLast(sessionName,(error, strSplit) => {
                res.render("./admin/private/callofschool.ejs", {
                    sessionName: strSplit,
                    sessionTypeUser: sessionTypeUser,
                    sessionCityUser : sessionCityUser,
                    sessionStateUser: sessionStateUser,
                    sessionUserId: sessionUserId,
                    nameOrgan: nameOrgan,
                    organType: organType,
                    colorStatus: '#f7bf4f',
                    status: 'Aberto',
                    // Chamados abertos para um órgão em específico
                    call: calls
                    //----------------------------------------------
                });
            }); 

        }); 

    }); 

    // View Calls received by Organ
    app.get("/anjos/area/view/call/received/byorgan/web", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
    
        var organId          = req.query.organId;
        var sessionUserId    = req.session.userWebSessionId;
        var sessionName      = req.session.userName;
        var sessionTypeUser  = req.session.userType;
        var nameOrgan        = req.session.nameOrgan;
        var organType        = req.session.organType;
        var sessionCityUser  = req.session.userCity;
        var sessionStateUser = req.session.userState;

        WebCallsCategService.getAllCallsOrganReceived(organId,(error,calls) => {

            StringUtil.splitStringFirstAndLast(sessionName,(error, strSplit) => {
                res.render("./admin/private/callofschool.ejs", {
                    sessionName: strSplit,
                    sessionTypeUser: sessionTypeUser,
                    sessionCityUser : sessionCityUser,
                    sessionStateUser: sessionStateUser,
                    sessionUserId: sessionUserId,
                    nameOrgan: nameOrgan,
                    organType: organType,
                    colorStatus: 'blue',
                    status: 'Recebido',
                    // Chamados abertos para um órgão em específico
                    call: calls
                    //----------------------------------------------
                });
            }); 

        }); 

    }); 

    // View Calls on process
    app.get("/anjos/area/view/call/onprocess/byorgan/web", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
    
        var organId          = req.query.organId;
        var sessionUserId    = req.session.userWebSessionId;
        var sessionName      = req.session.userName;
        var sessionTypeUser  = req.session.userType;
        var nameOrgan        = req.session.nameOrgan;
        var organType        = req.session.organType;
        var sessionCityUser  = req.session.userCity;
        var sessionStateUser = req.session.userState;

        WebCallsCategService.getAllCallsOrganOnProcess(organId,(error,calls) => {

            StringUtil.splitStringFirstAndLast(sessionName,(error, strSplit) => {
                res.render("./admin/private/callofschool.ejs", {
                    sessionName: strSplit,
                    sessionTypeUser: sessionTypeUser,
                    sessionCityUser : sessionCityUser,
                    sessionStateUser: sessionStateUser,
                    sessionUserId: sessionUserId,
                    nameOrgan: nameOrgan,
                    organType: organType,
                    colorStatus: 'orange',
                    status: 'Em Atendimento',
                    // Chamados abertos para um órgão em específico
                    call: calls
                    //----------------------------------------------
                });
            }); 

        }); 

    }); 

    // View Calls onway
    app.get("/anjos/area/view/call/ongoing/byorgan/web", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
    
        var organId          = req.query.organId;
        var sessionUserId    = req.session.userWebSessionId;
        var sessionName      = req.session.userName;
        var sessionTypeUser  = req.session.userType;
        var nameOrgan        = req.session.nameOrgan;
        var organType        = req.session.organType;
        var sessionCityUser  = req.session.userCity;
        var sessionStateUser = req.session.userState;

        WebCallsCategService.getAllCallsOrganOnGoing(organId,(error,calls) => {

            StringUtil.splitStringFirstAndLast(sessionName,(error, strSplit) => {
                res.render("./admin/private/callofschool.ejs", {
                    sessionName: strSplit,
                    sessionTypeUser: sessionTypeUser,
                    sessionCityUser : sessionCityUser,
                    sessionStateUser: sessionStateUser,
                    sessionUserId: sessionUserId,
                    nameOrgan: nameOrgan,
                    organType: organType,
                    colorStatus: 'blue',
                    status: 'A caminho',
                    // Chamados abertos para um órgão em específico
                    call: calls
                    //----------------------------------------------
                });
            }); 

        }); 

    }); 

    // View Calls finished by organ
    app.get("/anjos/area/view/call/finished/byorgan/web", MidCheckOnOff.checkOnOff ,MidAuth.authAdminWeb, (req, res) => {
    
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

    }); 
    //======================================================================================================================
    
}