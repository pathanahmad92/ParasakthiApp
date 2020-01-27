const axios = require('axios')

const url = "https://prasadlabapi.herokuapp.com/firms"

const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

const getfirms = async ()=>{
    try{
        let firms = await axios.get(url)
        return firms.data;
    }
    catch(error){
        return []
    }
}

const savefirms = async (dataToPost)=>{
    try{
        let firm = JSON.stringify({
            firmName : dataToPost.firmName,
            firmTitleAddress : dataToPost.firmTitleAddress,
            firmBriefAddress : dataToPost.firmBriefAddress,
            gstNo : dataToPost.gstNo,
        });
        return await axios.post(url,firm,config);
    }
    catch(error){
        return ""
    }
}

const updatefirms = async (dataToPost,id)=>{
    try{
        let firm = JSON.stringify({
            firmName : dataToPost.firmName,
            firmTitleAddress : dataToPost.firmTitleAddress,
            firmBriefAddress : dataToPost.firmBriefAddress,
            gstNo : dataToPost.gstNo,
        });
        await axios.put(url+"/"+id,firm,config);
    }
    catch(error){
        return []
    }
}

const deletefirms = async (id)=>{
    try{
        await axios.delete(url+"/"+id);
    }
    catch(error){
        return []
    }
}

module.exports = {
    getfirms : getfirms,
    savefirms : savefirms,
    updatefirms : updatefirms,
    deletefirms : deletefirms
}