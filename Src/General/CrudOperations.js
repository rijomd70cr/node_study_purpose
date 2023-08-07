const general = require("../Model/config");

const getModalPath = async (table) => {
    let Modal;
    general?.modelsPath?.length > 0 && general?.modelsPath.map((item) => {
        if (item.modalName === table) {
            Modal = require(`../Model/${item.modalPath}`);
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

module.exports = {
    create
}