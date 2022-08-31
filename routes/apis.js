const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "TicTacToe"
});
client.connect();

exports.login = async function(req, res) {
    //incoming: username, password
    //outgoing: success status, id, wins/losses/ties
  
    var error = '';
  
    const { username, password } = req.body;
  
    try{
      const db = client.db();
      const result = await 
      db.collection('User').find({Username: username}).toArray();
  
      var PasswordDB = '';
      var ID = '';
      var userInfo;
  
      if( result.length > 0 )
      {   
          PasswordDB = result[0].Password;
          //ID = result[0]._id;
          userInfo = result[0];
      }
    }
    catch(e)
    {
        error = e.toString();
    }
  
    bcrypt.compare(password, PasswordDB, function(err, results) {
      var message = '';
  
      if(results) {
        message = 'Sucessfully logged in.';
        var ret = {success: true, message: message, userInfo: userInfo, error: error};
        res.status(200).json(ret);
      }
      else {
        message = 'Authentication failed. Wrong credentials.';
        var ret = {success: false, message: message, error: error};
        res.status(200).json(ret);
      }
    });
  };
  
  exports.register = async function(req, res) {
    // incoming: username, password 
    // outgoing: error
  
    var error = '';
  
    const { username, password } = req.body;
    const db = client.db();
    let result = await db.collection('User').findOne({Username:username});
    if(result) {
      error = 'this username exists';
    }
    else{
      var userID = new ObjectId();
      bcrypt.hash(password, 10, function(err, hash) {
      try
      {
        
        const result = db.collection('User').insertOne(
            {
              _id : userID,
              Username: username,
              Password: hash,
              Wins: 0,
              Losses: 0,
              Ties: 0
            }
          );
      }
      catch(e)
      {
        error = e.toString();
      }
    });
    }
      
    var ret = { error: error };
    res.status(200).json(ret);
  };

exports.UpdateScore = async function(req, res)
{
  //incoming: userID, score
  //outgoing: error
  var error = '';

  const { userID, score } = req.body;
  var UserID = new ObjectId(userID);
  try
  {
    const db = client.db();
    if(score == 0){
      const result = db.collection('User').updateOne(
      { _id : UserID },
      {
        $inc: { Losses:1 }
      });
    }
    if(score == 1){
        const result = db.collection('User').updateOne(
        { _id : UserID },
        {
          $inc: { Wins:1 }
        });
    }
    if(score == 2){
    const result = db.collection('User').updateOne(
    { _id : UserID },
    {
      $inc: { Ties:1 }
    });
    }  
  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
};
