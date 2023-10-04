const Called          = require("../../models/entities/Called.js");
const CallingCategory = require("../../models/entities/CallingCategory.js");
const User            = require("../../models/entities/User.js");
const Organ           = require("../../models/entities/Organ.js");
const Notify          = require("../../models/entities/Notify.js");
const { Op }          = require('sequelize');

function createCall(createOrgan, callback) {

    const { code,description } = createOrgan;

  
    Called.findOne({ where: { 
      nameOrgan: nameOrgan
    } })
      .then(existingPermission => {
        if (existingPermission) {
          callback({ message: 'Já existe um órgão cadastrado com esse nome' }, null);
        } else {
            Organ.create({
                organType: organType,
                nameOrgan: nameOrgan,
                email:email,
                state: state,
                city: city,
                phone: phone,
                codeIcon: codeIcon,
                status: status
            })
            .then(results => {
                callback(null, results);
            })
            .catch(error => {
                callback(error, null);
            });
        }
        })
        .catch(error => {
          callback(error, null);
        });
}

function getAllCalls(callback) {
    Called.findAll({
        order: [['id', 'DESC']]
    }).then((results) => {
        callback(null, results);
    }).catch((error) => {
        callback(error, null);
    });
}

function getAllCallsForOrgan(organId, callback) {
    const getCallAll = {}; // objeto vazio
  
    Called.findAll({
      where: { organDestinyId: organId, status: 'Aberto' },
      include: [CallingCategory, User, Organ],
      attributes: ['id', 'city', 'state', 'description', 'dateHour', 'status','organOriginId','organDestinyId']
    }).then((calledData) => {
      //console.log(calledData);
      const cateId = calledData[0].callcategory.id;
      const userId = calledData[0].user.id;
  
      CallingCategory.findAll({
        where: { id: cateId },
        attributes: ['id', 'code', 'name', 'color', 'categoryType']
      }).then((cateData) => {
        
        User.findAll({
          where: { id: userId },
          attributes: ['id', 'name','nameOrgan']
        }).then((userData) => {
          getCallAll.calledData = calledData;
          getCallAll.cateData = cateData;
          getCallAll.userData = userData;
          
          callback(null, getCallAll);
        });
      });
    }).catch((error) => {
      callback(error, null);
    });
}

function getAllCallsForOrganPanel(organId, callback) {
    const getCallAll = { 
        calledData: [], 
        emergencyCallsCount: 0,
        alertCallsCount:0, 
        notifyCallsCount:0,
        statusFinishedCalls:0,
        statusOpenedCalls: 0   
    }; // Inicializa calledData como um array vazio e emergencyCallsCount como zero
  
    Called.findAll({
      where: { organDestinyId: organId , status: {[Op.not]: "Finalizado"} },
      include: [CallingCategory, User, Organ],
      attributes: ['id', 'city', 'state', 'description', 'dateHour', 'status','organOriginId','organDestinyId'],
      order: [
        ['id', 'DESC'],
    ],
    }).then((calledData) => {
      // Cria um array de promessas
      const promises = calledData.map((call) => {
        // Cria um objeto vazio para cada chamada
        const callObj = {};
        
        // Obtém o ID de categoria e preenche o objeto callObj
        const cateId = call.callcategory.id;
        return CallingCategory.findAll({
          where: { id: cateId },
          attributes: ['id', 'code', 'name', 'color', 'categoryType']
        }).then((cateData) => {
          callObj.category = cateData;
          
          // Obtém o ID de usuário e preenche o objeto callObj
          const userId = call.user.id;
          return User.findAll({
            where: { id: userId },
            attributes: ['id', 'name','nameOrgan']
          }).then((userData) => {
            callObj.user = userData;
            callObj.id = call.id;
            callObj.city = call.city;
            callObj.state = call.state;
            callObj.description = call.description;
            callObj.dateHour = call.dateHour;
            callObj.status = call.status;
            callObj.organOriginId = call.organOriginId;
            callObj.organDestinyId = call.organDestinyId;

            // Verifica se a chamada tem categoryType igual a "Emergência" e incrementa emergencyCallsCount em 1
            if (callObj.category[0].categoryType === 'Emergência') {
              getCallAll.emergencyCallsCount += 1;
            }

            // Verifica se a chamada tem categoryType igual a "Alerta" e incrementa alertCallsCountCount em 1
            if (callObj.category[0].categoryType === 'Alerta') {
                getCallAll.alertCallsCount += 1;
            }

            // Verifica se a chamada tem categoryType igual a "Alerta" e incrementa alertCallsCountCount em 1
            if (callObj.category[0].categoryType === 'Notificação') {
                getCallAll.notifyCallsCount += 1;
            }

            // Verifica quantos chamados possuem status "Finalizado"
            if (callObj.status === 'Finalizado') {
                getCallAll.statusFinishedCalls += 1;
            }
            
            // Verifica quantos chamados possuem status "Aberto"
            if (callObj.status === 'Aberto') {
              getCallAll.statusOpenedCalls += 1;
            }

            // Adiciona o objeto preenchido ao array de chamadas em getCallAll
            getCallAll.calledData.push(callObj);
          });
        });
      });
      
      // Espera até que todas as operações no banco de dados sejam concluídas antes de chamar a função de retorno de chamada
      Promise.all(promises).then(() => {
        callback(null, getCallAll);
      });
    }).catch((error) => {
      callback(error, null);
    });
}

function getAllCallsForSchoolPanel(organId, callback) {
    const getCallAll = { 
        calledData: [], 
        emergencyCallsCount: 0,
        alertCallsCount:0, 
        notifyCallsCount:0,
        statusFinishedCalls:0    
    }; // Inicializa calledData como um array vazio e emergencyCallsCount como zero
  
    Called.findAll({
      where: { organDestinyId: organId , status: {[Op.not]: "Finalizado"} },
      include: [CallingCategory, User, Organ],
      attributes: ['id', 'city', 'state', 'description', 'dateHour', 'status','organOriginId','organDestinyId']
    }).then((calledData) => {
      // Cria um array de promessas
      const promises = calledData.map((call) => {
        // Cria um objeto vazio para cada chamada
        const callObj = {};
        
        // Obtém o ID de categoria e preenche o objeto callObj
        const cateId = call.CallCategory.id;
        return CallingCategory.findAll({
          where: { id: cateId },
          attributes: ['id', 'code', 'name', 'color', 'categoryType']
        }).then((cateData) => {
          callObj.category = cateData;
          
          // Obtém o ID de usuário e preenche o objeto callObj
          const userId = call.User.id;
          return User.findAll({
            where: { id: userId },
            attributes: ['id', 'name','nameOrgan']
          }).then((userData) => {
            callObj.user = userData;
            callObj.id = call.id;
            callObj.city = call.city;
            callObj.state = call.state;
            callObj.description = call.description;
            callObj.dateHour = call.dateHour;
            callObj.status = call.status;
            callObj.organOriginId = call.organOriginId;
            callObj.organDestinyId = call.organDestinyId;

            // Verifica se a chamada tem categoryType igual a "Emergência" e incrementa emergencyCallsCount em 1
            if (callObj.category[0].categoryType === 'Emergência') {
              getCallAll.emergencyCallsCount += 1;
            }

            // Verifica se a chamada tem categoryType igual a "Alerta" e incrementa alertCallsCountCount em 1
            if (callObj.category[0].categoryType === 'Alerta') {
                getCallAll.alertCallsCount += 1;
            }

            // Verifica se a chamada tem categoryType igual a "Alerta" e incrementa alertCallsCountCount em 1
            if (callObj.category[0].categoryType === 'Notificação') {
                getCallAll.notifyCallsCount += 1;
            }

            // Verifica quantos chamados possuem status "Finalizado"
            if (callObj.status === 'Finalizado') {
                getCallAll.statusFinishedCalls += 1;
            }
            
            // Adiciona o objeto preenchido ao array de chamadas em getCallAll
            getCallAll.calledData.push(callObj);
          });
        });
      });
      
      // Espera até que todas as operações no banco de dados sejam concluídas antes de chamar a função de retorno de chamada
      Promise.all(promises).then(() => {
        callback(null, getCallAll);
      });
    }).catch((error) => {
      callback(error, null);
    });
}

function getAllCallsSchool(schoolId, callback) {
    Called.findAll(
        { where: { organOriginId: schoolId , status: { [Op.not]: 'Finalizado' } } }
    ).then((results) => {
        callback(null, results);
    }).catch((error) => {
        callback(error, null);
    });
}
//=============================================================
function getAllCallsSchoolOpened(schoolId, callback) {
  Called.findAll(
      { where: { organOriginId: schoolId , status: 'Aberto' }, order: [['id', 'DESC']] }
  ).then((results) => {
      callback(null, results);
  }).catch((error) => {
      callback(error, null);
  });
}

function getAllCallsSchoolReceived(schoolId, callback) {
  Called.findAll(
      { where: { organOriginId: schoolId , status: 'Recebido' } }
  ).then((results) => {
      callback(null, results);
  }).catch((error) => {
      callback(error, null);
  });
}

function getAllCallsSchoolOnProcess(schoolId, callback) {
  Called.findAll(
      { where: { organOriginId: schoolId , status: 'Em Atendimento' } }
  ).then((results) => {
      callback(null, results);
  }).catch((error) => {
      callback(error, null);
  });
}

function getAllCallsSchoolOnGoing(schoolId, callback) {
  Called.findAll(
      { where: { organOriginId: schoolId , status: 'A caminho' } }
  ).then((results) => {
      callback(null, results);
  }).catch((error) => {
      callback(error, null);
  });
}

function getAllCallsSchoolFinished(schoolId, callback) {
  Called.findAll(
      { where: { organOriginId: schoolId , status: 'Finalizado' } }
  ).then((results) => {
      callback(null, results);
  }).catch((error) => {
      callback(error, null);
  });
}
//======================================================
function getAllCallsOrganWithIdOpened(callback) {
  Called.findAll().then((results) => {
      callback(null, results);
  }).catch((error) => {
      callback(error, null);
  });
}

function getAllCallsOrganWithIdOpenedOrd(callback) {
  Called.findAll({
    order: [ ['id', 'DESC'] ],
  }).then((results) => {
      callback(null, results);
  }).catch((error) => {
      callback(error, null);
  });
}

function getAllCallsOrganOpened(organId, callback) {
  Called.findAll(
      { where: { organDestinyId: organId , status: 'Aberto' } }
  ).then((results) => {
      callback(null, results);
  }).catch((error) => {
      callback(error, null);
  });
}

function getAllCallsOrganReceived(organId, callback) {
  Called.findAll(
      { where: { organDestinyId: organId , status: 'Recebido' } }
  ).then((results) => {
      callback(null, results);
  }).catch((error) => {
      callback(error, null);
  });
}

function getAllCallsOrganOnProcess(organId, callback) {
  Called.findAll(
      { where: { organDestinyId: organId , status: 'Em Atendimento' } }
  ).then((results) => {
      callback(null, results);
  }).catch((error) => {
      callback(error, null);
  });
}

function getAllCallsOrganOnGoing(organId, callback) {
  Called.findAll(
      { where: { organDestinyId: organId , status: 'A caminho' } }
  ).then((results) => {
      callback(null, results);
  }).catch((error) => {
      callback(error, null);
  });
}

function getAllCallsOrganFinished(organId, callback) {
  Called.findAll(
      { where: { organDestinyId: organId , status: 'Finalizado' } }
  ).then((results) => {
      callback(null, results);
  }).catch((error) => {
      callback(error, null);
  });
} 
//======================================================
function updateCall(updateOrgan, callback){
  const { id, organType, nameOrgan, email, state, city, phone, codeIcon,  status } = updateOrgan;


  Called.update(
      {
          organType: organType,
          nameOrgan:nameOrgan,
          email: email,
          state: state,
          city: city,
          phone: phone,
          codeIcon: codeIcon,
          status: status
      },
      { where: { id: id } }
  ).then((results) => {
      callback(null, results);
  }).catch((error) => {
      callback(error, null);
  });

}

function deactivationCall(id,callback){
    Called.update(
    {
        status: 'Desativado'
    },
    { where: { id: id } }
    ).then((results) => {
        callback(null, results);
    }).catch((error) => {
        callback(error, null);
    });
}

function getCallById(id,callback){
    Called.findOne(
        { where: { id: id } }
    ).then((results) => {
        callback(null, results);
    }).catch((error) => {
        callback(error, null);
    });
}

function getCallsFinishedForAnOrgan(organId,callback){
    const getCallAll = {}; // objeto vazio
  
    Called.findAll({
      where: { organDestinyId: organId , status: 'Finalizado'},
      include: [CallingCategory, User, Organ],
      attributes: ['id', 'city', 'state', 'description', 'dateHour', 'status','organOriginId','organDestinyId']
    }).then((calledData) => {
      const cateId = calledData[0].CallCategory.id;
      const userId = calledData[0].User.id;
  
      CallingCategory.findAll({
        where: { id: cateId },
        attributes: ['id', 'code', 'name', 'color', 'categoryType']
      }).then((cateData) => {
        User.findAll({
          where: { id: userId },
          attributes: ['id', 'name','nameOrgan']
        }).then((userData) => {
          getCallAll.calledData = calledData;
          getCallAll.cateData = cateData;
          getCallAll.userData = userData;
  
          callback(null, getCallAll);
        });
      });
    }).catch((error) => {
      callback(error, null);
    });
}

// Operations in Panel ================================
function receivedCall(id,callback){
    Called.update(
        {
            status: 'Recebido'
        },
        { where: { id: id } }
        ).then((results) => {
            callback(null, results);
        }).catch((error) => {
            callback(error, null);
        });
}

function onWayCall(id,callback){
    Called.update(
        {
            onWay: true,
            status: 'A caminho'
        },
        { where: { id: id } }
        ).then((results) => {
            callback(null, results);
        }).catch((error) => {
            callback(error, null);
        });
}

function answerCall(id,callback){
    Called.update(
        {
            status: 'Em Atendimento'
        },
        { where: { id: id } }
        ).then((results) => {
            callback(null, results);
        }).catch((error) => {
            callback(error, null);
        });
}

function finishCall(id,callback){
    Called.update(
        {
            status: 'Finalizado'
        },
        { where: { id: id } }
        ).then((results) => {
            console.log(results);
            callback(null, results);
        }).catch((error) => {
            console.log(error);
            callback(error, null);
        });
}

function forwardCall(id,idOrganDestiny,callback){
    Called.update(
        {
            organDestinyId: idOrganDestiny
        },
        { where: { id: id } }
        ).then((results) => {
            callback(null, results);
        }).catch((error) => {
            callback(error, null);
        });
}

function getOrgansForwardCall(callback) {
    Organ.findAll({
        attributes: ['id', 'organType', 'nameOrgan'],
        where: { status: 'Ativado'},
        order: [['id', 'DESC']]
    }).then((organs) => {
        callback(null, organs);
    }).catch((error) => {
        callback(error, null);
    });
}

function notifyFinishCall(id,idOrganDestiny,callback){
    //Notify.create( ... )
}
// Operations in Panel ================================

module.exports = { 
    createCall , 
    getAllCalls , 
    getCallById, 
    getAllCallsOrganWithIdOpened,
    updateCall , 
    deactivationCall,
    getAllCallsForOrgan,
    getAllCallsSchool,
    getAllCallsForOrganPanel,
    getAllCallsForSchoolPanel,
    getCallsFinishedForAnOrgan,
    getAllCallsOrganOpened,
    getAllCallsOrganReceived, 
    getAllCallsOrganOnProcess,
    getAllCallsOrganOnGoing,
    getAllCallsOrganFinished,
    // For school viewer
    getAllCallsSchoolOpened,
    getAllCallsSchoolReceived,
    getAllCallsSchoolOnProcess,
    getAllCallsSchoolOnGoing,
    getAllCallsSchoolFinished,
    // Operations in Panel ================================
    receivedCall,
    onWayCall,
    answerCall,
    finishCall,
    forwardCall,
    getOrgansForwardCall,
    notifyFinishCall,
    getAllCallsOrganWithIdOpenedOrd
    // Operations in Panel ================================
};