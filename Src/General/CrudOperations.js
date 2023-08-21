const mongoose = require("mongoose");
const general = require("../Config/DatabaseSample/configDBStudy");
const { DB } = require('../Config/initDb');

const getModalPath = async (table) => {
    let Modal;
    general?.modelsPath?.length > 0 && general?.modelsPath.map((item) => {
        if (item.modalName === table) {
            let schemaService = require(`../Model/${item.path}`);
            if (DB) {
                console.log(DB)
                Modal = DB.model(item.modalName, schemaService?.[item.schemaName]);
            }
            else {
                console.log("else")
                Modal = mongoose.model(item.modalName, schemaService?.[item.schemaName])
            }
        }
    });
    return Modal ? Modal : "Table";
}

const create = async (table, body) => {
    try {
        const Modal = await getModalPath(table);
        const modalInstance = new Modal(body);
        return await modalInstance.save();
    } catch (error) {
        throw new Error(error);
    }
}

const list = async (table, body) => {
    try {
        const Modal = await getModalPath(table);
        return await Modal.find();
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    create, list
}