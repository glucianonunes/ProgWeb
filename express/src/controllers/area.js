const { Area } = require('../models/index');


const index = async (req, res) =>{
    const areas = await Area.findAll();
    res.render("area/index", {
        areas: areas.map((area) => area.toJSON())
    });
}

module.exports =  { index }