import express, { response } from 'express';
import session from 'express-session';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
var router = express.Router();
//default router
router.get('/', function(req, res, next) {
    res.send("This is routes/api/api.js")
})
//post profile and saves it to the database
router.post('/profile', async function(req, res, next) {
    let session = req.session;
    try {
        const newUser = new req.body.Post({
            username: session.account.username,
            email: session.account.email
        })
        await newUser.save();
        res.send({status: 'success'})
    } catch(error) {
        res.send({status:'error', error: 'could not connect to the database'})
    }
})

//** SEARCH FEATURES **/

//gets the results and finds where the database has a certain user and
//sends filtered users, used for search
router.get('/results', async function(req, res, next) {
    let session = req.session;
    if (!session.isAuthenticated) {
        res.send({
            status: 'error',
            error: 'not logged in'
        })
    }
    let allUsers = await req.db.User.find()
    let requestQuery = req.query.user.toLowerCase()
    let filteredUsers = [];
    allUsers.forEach(user => {
        if (user.username.includes(requestQuery)) {
            filteredUsers.push(user)
        }
    })
    let usersResponse = JSON.parse(JSON.stringify(filteredUsers))
    res.send(usersResponse)
})

//filters the results for specific username, used for search
router.get('/filteredResult', async function (req, res, next) {
    let session = req.session;
    if (!session.isAuthenticated) {
        res.send({
            status: 'error',
            error: 'not logged in'
        })
    }
    let allUsers = await req.db.User.find()
    let requestQuery = req.query.profession
    let filteredUsers = [];
    allUsers.forEach(user => {
        if (user.profession.includes(requestQuery)) {
            filteredUsers.push(user)
        }
    })

    let usersResponse = JSON.parse(JSON.stringify(filteredUsers))
    res.send(usersResponse)
})

//retrieves recomemndations by randomly selecting top 3 users, used for recommendation
//cards.
router.get('/getRecommendations', async function(req, res, next) {
    let session = req.session;
    if (!session.isAuthenticated) {
        res.send({
            status: 'error',
            error: 'not logged in'
        })
    }
    let listOfUsers = await req.db.User.find()
    
    //for now instead of doing an algorithm we're selecting recommendations randomly, i.e. completely random users
    //let randomUser = listOfUsers[Math.floor(Math.random() * listOfUsers.length)]
    let shuffledUsers = [...listOfUsers].sort(() => 0.5 - Math.random())
    let randomUsers = shuffledUsers.slice(listOfUsers, 2)

    let usersResponse = JSON.parse(JSON.stringify(randomUsers))
    res.send(usersResponse)
    
})

//** CHATS AND USERS **/
//gets all users and sends it as a response
router.get('/allUser', async function(req, res, next) {
    let session = req.session;
    if (!session.isAuthenticated) {
        res.send({
            status: 'error',
            error: 'not logged in'
        })
    }
    let listOfUsers = await req.db.User.find()
    res.send(listOfUsers)
    
    
})

//retrieves all the chats in the database
router.get("/allChat", async function (req, res, next) {
    let session = req.session;
    if (!session.isAuthenticated) {
        res.send({
            status: 'error',
            error: 'not logged in'
        })
    }
    let listOfChat = await req.db.Chat.find()
    res.send(listOfChat)
  });


//posts a chat taking in all the info from the user and posting it to the database
router.post("/chat", async function (req, res, next) {
    let session = req.session;
    if (session.isAuthenticated) {
      try {
        const newChat = new req.db.Chat({
            username: req.session.account.username,
            full_name: req.session.account.name,   
            chat: req.body.newChat,
            userID: req.body.userID,
            created_date: Date.now()
        });
  
        await newChat.save();
        res.send({ status: "success" });
      } catch (error) {
        res.send({ status: "error", error: "could not connect to database" });
      }
    } else {
      res.json({ status: "error", error: "not logged in" });
    }
});


//gets a chat and matches it where the user id matches, used for loading all comments  
router.get('/getChat', async function(req,res, next) {
    let userId = req.query.user
    const allChats = await req.db.Chat.find({ userID : userId });
    let responseJson = JSON.parse(JSON.stringify(allChats))
    res.send(responseJson)
})

export default router;