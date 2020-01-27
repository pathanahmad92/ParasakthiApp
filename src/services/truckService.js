const axios = require('axios')

const url = "https://prasadlabapi.herokuapp.com/trucks"

const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

const getTrucks = async ()=>{
    try{
        let trucks = await axios.get(url)
        return trucks.data;
    }
    catch(error){
        return []
    }
}

const saveTrucks = async (dataToPost)=>{
    try{
        let truck = JSON.stringify({
            truckNumber : dataToPost.truckNumber
        });
        return await axios.post(url,truck,config);
    }
    catch(error){
        return ""
    }
}

const updateTrucks = async (dataToPost,id)=>{
    try{
        let truck = JSON.stringify({
            truckNumber : dataToPost.truckNumber
        });
        await axios.put(url+"/"+id,truck,config);
    }
    catch(error){
        return []
    }
}

const deleteTrucks = async (id)=>{
    try{
        await axios.delete(url+"/"+id);
    }
    catch(error){
        return []
    }
}

module.exports = {
    getTrucks : getTrucks,
    saveTrucks : saveTrucks,
    updateTrucks : updateTrucks,
    deleteTrucks : deleteTrucks
}