module.exports = (sequelize, Sequelize) => {
    const Process = sequelize.define('process', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            pid: {
                type: Sequelize.INTEGER,
            },
            host_machine_id: {
                type: Sequelize.INTEGER
            },
            log_file: {
                type: Sequelize.STRING
            },
            notification_params: {
                type: Sequelize.STRING
            }
        },
        {   
            freezeTableName: true,
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        });
    return Process;
}

