import express from "express";
var router = express.Router();

/* GET landing page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// display home/dashboard page
router.get("/home", function (req, res, next) {
  let username = req.session.account.name;
  res.send(`
  <html>

  <head>
    <title>UW Networking App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="/stylesheets/style.css">
    <link
      href="https://fonts.googleapis.com/css2?family=Encode+Sans&family=Julius+Sans+One&family=Noto+Sans+Display:ital,wght@0,400;0,500;1,500&display=swap"
      rel="stylesheet">
    <script src="/javascripts/index.js"></script>
    <script src="/javascripts/editprofile.js"></script>
  </head>
  
  <body onload="init()">
    <div class="container text-center">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <div class="mt-3">
                  <!--Will eventually be  -->
                  <h3 class=""><a href="/users/profile?username=${req.session.account.username}">Welcome, ${username}</a></h3>
                </div>
              </div>
            </div>
          </div>
          <div class="card mt-2">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <div class="mt-3">
                  <p class="">Welcome to Dawg Network!</p>
                  <p>Search for users to contact using the search bar on the right. 
                  You can view more information about a user by clicking on their card in the search results.
                  Additionally, you can leave feedback / comments on the user by clicking on their card.</p>
                  <p>You can edit your profile by clicking your name above.</p>
                </div>
              </div>
            </div>


          </div>
        </div>
        <div class="col-5">
          <div class="card mb-2">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <div class="mt-3">
                  <h1>Dawg Network</h1>
                </div>
              </div>
            </div>
          </div>

          <div id="chosenUser">
          </div>


        </div>
        <div class="col">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <div class="mt-3">
                  <div id="search_users_div">
                    <h2>Search by username</h2>
                    <input type="text" id="searchUserInput" placeholder="search by name...">
                    <button class="btn btn-primary btn-sm" onclick="searchUserFunction()">Search</button>
                    <button class="btn btn-primary btn-sm" onclick="getRecommendations()">Get Recommendations</button>
                    <button class="btn btn-primary btn-sm" onclick="clearCards()">Clear</button>
                    
              
                    <h2>Advanced Search</h2>
                    <button class="btn btn-primary btn-sm" onclick="renderAdvancedSearch()">Advanced search</button>
                    <label for="usersDropdown">Filter users...</label>
                      <select id="filterUserSearch">
                        <option value="Professor">Professor</option>
                        <option value="Student">Student</option>
                        <option value="Employer">Employer</option>
                      </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mt-2">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <div class="mt-3">
                  <p>Search Results</p>
                  <p id="search_users_results">Recommendations</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mt-2">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <div class="mt-3">
                <p>Recommendations</p>
                  <p id="recommendations_div">Recommendations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    
  
  
  
    <!-- To do: replace this with a function that returns cards for every user -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"></script>
  </body>
  
  </html>
  `);
});

export default router;
