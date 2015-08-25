var puppyData = require('../models/puppies');
var tmpArr = puppyData.tempPuppyArr;

function allGet() {
  return tmpArr;
}

function singleGet(puppyID){
  var response;
  var pup = tmpArr.filter(function(puppy){
    return puppy.puppyID === +puppyID;
  });
  if (pup.length > 0) {
    return pup[0];
  }
  else {
    return {message: 'No such puppy.'};
  }
}

function handlePost(puppyID, puppyName, puppyAge) {
  var pup = tmpArr.filter(function(puppy){
    return  puppy.puppyID === +puppyID;
  });

  if (pup.length > 0) {
    return {error: 'Puppy already exists, idiot.'};
  }
  else {
    var addPuppy = new puppyData.Puppy(
      +puppyID,
      puppyName,
      +puppyAge
      );
    tmpArr.push(addPuppy);
    return {message: 'Puppy Added Successfully!', puppy:addPuppy};
  }
}

function handlePut(puppyID, bodyObj) {
  if (Object.keys(bodyObj).length === 0) {
    return {message: "Please enter something to change."};
  }
  // validate if puppy's age is a number
  if (bodyObj.puppyAge && isNaN(parseInt(bodyObj.puppyAge))) {
    return {message: "Please enter a number for the puppy's age."};
  }
  var pup = tmpArr.filter(function(puppy){
    return  puppy.puppyID === +puppyID;
  });

  if (pup.length > 0) {
    for (var i = 0; i < tmpArr.length; i++) {
      if (tmpArr[i].puppyID === +puppyID) {
        for (var key in bodyObj) {
          if (key === 'puppyName') {
            tmpArr[i].puppyName = bodyObj.puppyName;
          }
          else if(key === 'puppyAge') {
            tmpArr[i].puppyAge = bodyObj.puppyAge;
          }
        }
      }
    }
    return tmpArr;
  }
  else {
    return {message: "Ain't got that puppy."};
  }
}

function handleDelete(puppyID) {
  var pup = tmpArr.filter(function(puppy){
    return  puppy.puppyID === +puppyID;
  });

  if (pup.length > 0) {
    //remove from array
    for (var i = 0; i < tmpArr.length; i++) {
      if (tmpArr[i].puppyID === parseInt(puppyID)) {
        var tmpPuppy = tmpArr.splice(i, 1)[0];
        return {
          message: 'That puppy is gone.',
          puppy: tmpPuppy
        };
      }
    }
  }
  else {
    return {message: "Puppy ain't here."};
  }
}

module.exports = {
  allGet: allGet,
  singleGet: singleGet,
  handlePost: handlePost,
  handlePut: handlePut,
  handleDelete: handleDelete
};
