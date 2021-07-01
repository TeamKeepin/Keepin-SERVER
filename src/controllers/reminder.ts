const ActivityService = require('./service');

const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

module.exports = {
    read: async (req, res) => {
        const {
            CityId
        } = req.params; //*
      
        if (!CityId) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        ActivityService.read({
                CityId
            })
            .then(({
                    code,
                    json
                }) =>
                res.send(json).status(code)
            ).catch(err => {
                console.log(err);
                res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            })
    },
    create: async (req, res) => {
        const {
            name,
            cost,
            content,
            url_mrt,
            url_kl
        } = req.body;
        const img = req.file.location; //*
    
        const {
            CityId
        } = req.params; //*
        if (!name || !cost || !content || !url_mrt || !url_kl || !img) {
            const missParameters = Object.entries({
                name,
                cost,
                content,
                url_mrt,
                url_kl,
                img,
                CityId
                })
                .filter(it => it[1] == undefined).map(it => it[0]).join(',');
            res.send(utils.successFalse(sc.BAD_REQUEST, `${rm.NULL_VALUE}, ${missParameters}`));
            return;
        }
        
        ActivityService.create({
                name,
                cost,
                content,
                url_mrt,
                url_kl,
                img,
                CityId
            })
            .then(({
                    json
                }) =>
                res.send(json)
            ).catch(err => {
                res.send(err);
            })
    },
    update: async (req, res) => {
        const {
            id,
            cost,
            content,
            url_mrt,
            url_kl
        } = req.body;
        const img = req.file.location; //*
    
        const {
            CityId
        } = req.params; //*
        if (!id || !cost || !content || !url_mrt || !url_kl || !img) {
            const missParameters = Object.entries({
                id,
                cost,
                content,
                url_mrt,
                url_kl,
                img,
                CityId
                })
                .filter(it => it[1] == undefined).map(it => it[0]).join(',');
            res.send(utils.successFalse(sc.BAD_REQUEST, `${rm.NULL_VALUE}, ${missParameters}`));
            return;
        }
        ActivityService.update({ //@@
                id,
                cost,
                content,
                url_mrt,
                url_kl,
                img,
                CityId
            })
            .then(({
                    json
                }) =>
                res.send(json)
            ).catch(err => {
                console.log(err);
                res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            })
    },
    delete: async (req, res) => {
        const {
            id
        } = req.body;
       
        if (!id) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        ActivityService.delete({
            id
            })
            .then(({
                    json
                }) =>
                res.send(json)
            ).catch(err => {
                console.log(err);
                res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            })
    },
}