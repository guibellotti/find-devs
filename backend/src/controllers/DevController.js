const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },

  async store (req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });
  
    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
      const { name = login, avatar_url, bio } = apiResponse.data;
    
      const techsArray = parseStringAsArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })
    }
    return res.json(dev);
  },
  
  async update (req, res) {
    // name, avatar, bio, tech and location
    const { github_username } = req.body;
    const techsArray = parseStringAsArray(req.body.techs);
    const location = {
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude],
    }

    dev = await Dev.findOne({ github_username });

    if (!dev) {
      return res.json({message: "Dev não encontrado :(" })      
    } else {      
      dev = await Dev.updateOne({ 
        name: req.body.name,
        avatar_url: req.body.avatar_url,
        bio: req.body.bio,
        techs: techsArray,
        location,
      });
    }
    
    // console.log(dev)
    return res.json({ message: "Dev atualizado" });
  },

  async destroy (req, res) {
    // by username
    const { github_username } = req.params;
    dev = await Dev.findOne({ github_username });
    
    if (dev){
      dev = await Dev.deleteOne({github_username});
    } else {
      res.json({ message: 'Dev não encontrado :(' })
    }

    console.log(dev);
    return res.json({ message: 'Dev deletado' });
  }
};