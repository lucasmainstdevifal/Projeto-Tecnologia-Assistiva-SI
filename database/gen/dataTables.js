/*@@@ Generate datatables in sync succesfuly synced Database */
//------------------------------------------------------------------------------------------
// Models [Represent for Entities] :
const Client      = require("../../models/entities/Client.js");
const Company     = require("../../models/entities/Company.js");
const Product     = require("../../models/entities/Product.js");
const Order       = require("../../models/entities/Order.js");
//------------------------------------------------------------------------------------------

module.exports = new class{
    init(){

        // Generate Datatables:
        Client.sync({ force : true })
        .then(() => {
            Client.create({cpf: 40,name: 'Lucas',password: 1234});
        });

        Company.sync({ force : true });
        Product.sync({ force: true });
        Order.sync({ force: true });
        // Generate Datatables:
        /*
        OnOff.sync({ force : true })
        .then(() => {
            OnOff.create({ligadodesligado: 1,status_system: 'Ligado'});
        });
        OnOffApp.sync({ force :true })
        .then(() => {
            OnOffApp.create({ligadodesligado: 1,status_system: 'Ligado'});
        });
        Organ.sync({ force: true })
        .then(() => 
        { 
            Organ.create({organType: 'Admin',nameOrgan: 'Administrador',email: 'admin@anjos.com',state: 'Alagoas',city: 'Palmeira dos Índios',phone: '82996483649',codeIcon: 'x_admin',status: 'Ativado'});
        */
            //User.sync({ force: true }).then(() => {
                // Administrator Default Login   : 000.000.000-00
                // Administrator Default Password: Admin@pmp
            //    User.create({name: 'Administrador',state: 'AL',city: 'Palmeira dos Índios',email: 'dti@palmeiradosindios.al.gov.br', cpf: '000.000.000-00', phone: '00 00000-0000', password: '$2a$10$VsFjKgI75AaeLDyjSSeSB.4KZP27RbJD.bwdoG1fKgbw20JxJXVUe',userType: 'Admin',nameOrgan: 'Administrador', statusAcess: 'Ativado', OrganId: '1', sigla: 'admin'});
            //})
       // })
       //Called.sync({ force: true })
       /*
        .then(() => CallCategory.sync({ force: true }))
        .then(() => TypeCalled.sync({ force: true }))
        .then(() => Called.sync({ force: true }))
        .then(() => Notify.sync({ force: true }))
        .then(() => Permission.sync({ force: true }))
        .then(() => OrganPermission.sync({ force: true }))
        .then(() => CalledNotify.sync({ force: true }))
        .then(() => console.log('Database Synced Successfully - PMPI Anjos da Guarda'))
        .catch(error => console.error(error));*/
        //TypeCalled.sync({ force: true });

        //NotificationToken.sync({ force: true });
 
    }
    
}