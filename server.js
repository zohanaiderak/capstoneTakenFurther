const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const phoneRoutes = require("./phoneRoutes");
const accessoryRoutes = require("./accessoryRoutes");
const send = require('./send');
const upload = require('./multer');
const contact = require('./contact');
const path = require('path');
const User = require('./models/user');
const UserSession = require('./models/usersession');
const bcrypt = require('bcryptjs');

app.use(cors());

app.use(express.json());

app.use(bodyParser.json());

app.use(express.static('assets'));

app.use(express.static(path.join(__dirname , '/client/build')));

app.use('/api/phone', phoneRoutes );

app.use('/api/accessor' , accessoryRoutes);

app.use('/api/send' , send);

app.use('/api/contact' , contact)

app.use('/api/upload', upload );

// app.post('/api/account/signup', (req,res,next)=>{
//   const {body} = req;
//   const {username, password} = body;
// console.log(username, password)
//   if(!username){
//     return res.send({
//       success: false,
//       message: 'missing username'
//     });
//   }
//   if(!password){
//     return res.send({
//       success:false,
//       message:'no password set'
//     })
//   }
//   const newUser = new User();
//   newUser.username = username;
//   newUser.password = newUser.generateHash(password);
//   newUser.save((err,user)=>{
//     if (err) {
//       return res.send({
//         success: false,
//         message : 'Error: Server Error'
//       })
//     }
//     return res.send({
//       success: true,
//       message: 'Signed Up'
//     })
//   })
// });

app.post('/api/account/signin', (req,res,next)=>{
  const {body} = req;
  const {username, password} = body;
  if(!username){
        return res.send({
          success: false,
          message: 'Please fill in the Username'
        });
      }
      if(!password){
        return res.send({
          success:false,
          message:'Please enter Password'
        })
      }
    User.find({
      username: username
    }, (err,users)=>{
      if(err){
        return res.send({
          success: false,
          message: "Username not found!"
        })
      }
      if(users.length !== 1){
        return res.send({
          success: false,
          message: "Error: Invalid username"
        })
      }

      const user = users[0];
      if (!user.validPassword(password)){
        return res.send({
          success: false,
          message: 'Error: Invalid Password'
        });
      }
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err,doc)=>{
        if(err){
          return res.send({
            success:false,
            message: 'Error: Server Error'
          })
        }

        return res.send({
          success: true,
          message: 'Valid signIn',
          token: doc._id
        })
      })
    })
})

app.get('/api/account/verify', (req,res,next)=>{
const {query} = req;
const {token} = query;

UserSession.find({
  _id: token,
  isDeleted: false
}, (err, sessions)=>{
  if (err){
    return res.send({
      success: false,
      message: 'Error: Server error'
    })
  }
  if (sessions.length !== 1 ){
    return res.send({
      success: false,
      message: 'Error: Invalid'
    })
  } else {
    return res.send({
      success: true,
      message: 'Verified'
    })
  }
})
})

app.get('/api/account/logout', (req,res,next)=>{
  const {query} = req;
const {token} = query;

UserSession.findOneAndUpdate({
  _id: token,
  isDeleted: false
},{
  $set:{isDeleted: true}
},null, (err, sessions)=>{
  if (err){
    return res.send({
      success: false,
      message: 'Error: Server error'
    })
  }
    return res.send({
      success: true,
      message: 'Successfully signed out'
    })
})
})

mongoose.connect(
  process.env.MONGODB_CONN,
  { useNewUrlParser: true , useUnifiedTopology: true },
  ()=>{
  console.log("connected to db!")
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
