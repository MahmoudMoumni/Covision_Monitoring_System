module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define('notification', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            process_db_id: {
                type: Sequelize.INTEGER
            },
            error_message: {
                type: Sequelize.STRING
            },
            running_time_sec: {
                type: Sequelize.BIGINT
            },
            status: {
                type: Sequelize.TINYINT(1)
            }
        },
        {
            freezeTableName: true,
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        });
    return Notification;
}