module.exports = {
    data_URL: function () {
        return process.env.DATA_URL
    },

    notify_message: function () {
        return process.env.NOTIFY_MESSAGE || "Jai Jinendra 🙏"
    },

    notify_receivers: function () {
        var recvs = process.env.NOTIFY_RECEIVERS.split(",")
        console.log("No. of receivers: " + recvs.length)
        for (r in recvs) {
            console.log("Receiver: " + recvs[r])
        }
        return recvs
    },

    notify_time: function () {
        /*
         * By default runs everyday at 5:55:00 AM.
         */
        return process.env.NOTIFY_TIME || '00 55 5 * * *'
    },

    calender_lunar_URL: function () {
        return process.env.CALENDER_LUNAR_URL
    },

    calender_solar_URL: function () {
        return process.env.CALENDER_SOLAR_URL
    },

    token: function () {
        return process.env.TOKEN
    }

}
