import express from 'express';
var router = express.Router();

// redirect to current users profile 
router.get('/', function (req, res, next) {
  let session = req.session
  if (session.isAuthenticated) {
    res.redirect('/users/profile?username=' + session.account.username)
  } else {
    res.send('ERROR: You must be logged in to see this information!')
  }
});

// microsoft log in page
router.get('/login', function (req, res, next) {
  res.send(`
  <html>

  <head>
    <title>UW Networking App - Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="/stylesheets/style.css">
    <script src="javascripts/login.js"></script>
  </head>
  
  <body onload="">
  <div class="container-fluid">
  <div class="row no-gutter">
      <div class="col-md-6 d-none d-md-flex bg-image"></div>


      <div class="col-md-6 bg-light">
          <div class="login d-flex align-items-center py-5">

              <div class="container">
                  <div class="row">
                      <div class="col-lg-10 col-xl-7 mx-auto">
                          <!--<h3 class="display-5 text-center">Dawg Network</h3>-->
                          <div class="row justify-content-center">
                          
                          <a href="/signin" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm text-center" role="button">Sign in</a>
                          <p class="text-muted text-center mb-4">Sign in with a Microsoft account</p>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </div>

  </div>
  </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  </body>
  
  </html>
  
  `);
});

// display edit profile page
router.get('/profile/edit', async function (req, res, next) {
  let userInfo = await req.db.User.find({ username: req.session.account.username })
  let userInfoObj = userInfo[0]
  let full_name, email, major, profession, interests
  full_name = email = major = profession = interests = "N/A"

  // set vars from db so user can see current profile values
  if (userInfoObj.full_name) { full_name = userInfoObj.full_name }
  if (userInfoObj.email) { email = userInfoObj.username }
  if (userInfoObj.major) { major = userInfoObj.major }
  if (userInfoObj.profession) { profession = userInfoObj.profession }
  if (userInfoObj.interest) { interests = userInfoObj.interest }

  res.send(`
  <html>
  <head>
  <title>Dawg Chat - Edit Profile</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <link rel="stylesheet" href="/stylesheets/style.css">
  <script src="/javascripts/editprofile.js"></script>
  </head>
  <body onload="">
  
  <div class="container">
    <div class="main-body">
    <!-- Breadcrumb -->
      <nav aria-label="breadcrumb" class="main-breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Home</a></li>
          <li class="breadcrumb-item"><a href=${"/users/profile?username=" + req.session.account.username}>User Profile</a></li>
          <li class="breadcrumb-item active" aria-current="page">Edit</li>
        </ol>
      </nav>
      <!-- /Breadcrumb -->
      <div class="row">
        <div class="col-lg-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt="Admin"
                  class="rounded-circle p-1" width="110">
                <div class="mt-3">
                  <h4>${req.session.account.username}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card">
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Full Name</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" id="full_name" class="form-control" placeholder="Enter full name.." value="${full_name}">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Major</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" id="major" class="form-control" placeholder="Enter major.." value="${major}">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Profession</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" id="profession" class="form-control" placeholder="Enter profession.." value="${profession}">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Interests</h6>
                </div>
                
                <div class="col-sm-9 text-secondary">
                  <input type="text" id="interests" class="form-control" placeholder="Enter interests.." value="${interests}">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-9 text-secondary">
                  <input type="button" class="btn btn-primary px-4" value="Save Changes" onclick="saveChanges()">
                  <a class="btn btn-primary" href=${"/users/profile?username=" + req.session.account.username} role="button">Return to Profile</a>
                  <div id="confirmProfChanges"><div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
    crossorigin="anonymous"></script>
</body>
</html>
  `)
})

// update user profile information
router.put('/profile/update', async function (req, res, next) {
  let session = req.session
  //console.log(session.account.username)
  if (session.isAuthenticated) {
    try {
      let username = session.account.username
      console.log(username)
      let fullname = req.body.full_name
      let major = req.body.major
      let profession = req.body.profession
      let interest = req.body.interest
      let userInfo = await req.db.User.find({ username: username })
      let userInfoObj = userInfo[0]
      if (userInfoObj) {
        userInfoObj.full_name = fullname
        userInfoObj.major = major
        userInfoObj.profession = profession
        userInfoObj.interest = interest
        await userInfoObj.save()
      }
      res.json({ "status": "success" });
    } catch (error) {
      res.json({ "status": "error", "error": error });
    }
  } else {
    res.json({ "status": "error", "error": "not logged in" })
  }
})

router.get('/profile', async function (req, res, next) {
  let username = req.query.username

  // only display edit button for user who's logged in page
  let display = "";
  if (username !== req.session.account.username) {
    display = "d-none"
  }

  let userInfo = await req.db.User.find({ username: username })
  // find() returns array, just putting it into an object so it's easier to work with
  let userInfoObj = userInfo[0]
  if (userInfoObj) {

    let full_name, email, major, profession, interests
    full_name = email = major = profession = interests = "N/A"

    // set profile variables
    if (userInfoObj.full_name) { full_name = userInfoObj.full_name }
    if (userInfoObj.email) { email = userInfoObj.username }
    if (userInfoObj.major) { major = userInfoObj.major }
    if (userInfoObj.profession) { profession = userInfoObj.profession }
    if (userInfoObj.interest) { interests = userInfoObj.interest }

    // use info from db to populate profile page
    res.send(`
  <html>

<head>
  <title>Dawg Network - Profile</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <link rel="stylesheet" href="/stylesheets/style.css">
  <script src="/javascripts/index.js"></script>
</head>

<body>
  <div class="container">
    <div class="main-body">

      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb" class="main-breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/home">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">User Profile</li>
        </ol>
      </nav>
      <!-- /Breadcrumb -->

      <div class="row gutters-sm">
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt="avatar" class="rounded-circle"
                  width="150">
                <div class="mt-3">
                  <h4>${username}</h4>
                  <button class="btn btn-primary" onclick='openChat("${userInfoObj._id}")'>View User Comments/Feedback</button>
                    ${userInfoObj.likes && userInfoObj.likes.includes(username) ? 
                      `<button id="profile-like" class="btn btn-primary" onclick='likePost("${userInfoObj._id}")'>&#x2661; ${userInfoObj.likes.length}</button>` : `<button id="profile-like" class="btn btn-primary" onclick='unlikePost("${userInfoObj._id}")'>&#x2665; ${userInfoObj.likes.length}</button>`
                      }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card mb-3">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Full name</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  ${full_name}
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Email/Username</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                ${username}
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Major</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  ${major}
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Profession</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  ${profession}
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Interests</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  ${interests}
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-12">
                  <a class="btn btn-primary ${display}" 
                    href="/users/profile/edit">Edit</a>
                  <a class="btn btn-primary ${display}" target="__blank"
                    href="/signout">Sign Out</a>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-2">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <div class="mt-3">
                  <h5>Comments / Feedback:</h5>
                  <div id="userComments"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" id="comments">
          
    </div>
  </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
    crossorigin="anonymous"></script>
</body>

</html>
  `)
  } else {
    res.send(`Error: Profile not found!`)
  }

})

// like / unlike user

router.post('/likeUser', async function (req, res, next) {
  let session = req.session
  if (session.isAuthenticated) {
      try {
          let userID = req.body.userID
          console.log('test')
          console.log(userID)
          let post = await req.db.User.findById(userID)
          console.log("like" + post)
          if (!post.likes.includes(session.account.username)) {
              post.likes.push(session.account.username)
          }
          await post.save()
          res.json({ status: "success" })
      } catch (error) {
          res.json({ "status": "error", "error": error });
      }
  } else {
      res.json({ "status": "error", "error": "not logged in" })
  }
})

// removes like from user
router.post('/unlikeUser', async function (req, res, next) {
  console.log("Test")
  let session = req.session
  if (session.isAuthenticated) {
      try {
          let userID = req.body.userID
          console.log("Endpoint " + userID)
          let post = await req.db.User.findById(userID)
          console.log(post)
          if (post.likes.includes(session.account.username)) {
              let i = post.likes.indexOf(session.account.username)
              if (i > -1) {
                  post.likes.splice(i, 1)
              }
          }
          await post.save()
          res.json({ status: "success" })
      } catch (error) {
          res.json({ "status": "error", "error": error });
      }
  } else {
      res.json({ "status": "error", "error": "not logged in" })
  }
})

// get likes for user
router.get('/getLikes', async function (req, res, next) {
  console.log("Test")
  let userID = req.query.userID
  let userInfo = await req.db.User.findById(userID)
  let likes = userInfo.likes
  console.log(likes)
  let containsCurrent = "false"
  if (likes.length !== 0 && likes.includes(req.session.account.username)) {
    containsCurrent = "true"
  }
  res.json({
    likes: likes.length,
    containsCurrent: containsCurrent
  })
})

export default router;