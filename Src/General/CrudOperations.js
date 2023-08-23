const mongoose = require("mongoose");
const general = require("../Config/DatabaseSample/configDBModels");

const getModalPath = async (table) => {
    let Modal;
    general?.modelsPath?.length > 0 && general?.modelsPath.map((item) => {
        if (item.modalName === table) {
            let schemaService = require(`../Model/${item.path}`);
            Modal = mongoose.model(item.modalName, schemaService?.[item.schemaName])
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