// clears search on dashboard/home page load
async function init() {
    clearCards()
}

// clears search card
async function clearCards() {
  document.getElementById("search_users_results").innerHTML = "";
  document.getElementById("recommendations_div").innerHTML = "";
}

// renders the advanced search results
async function renderAdvancedSearch() {
  document.getElementById("search_users_results").innerHTML = "";
  let inputtedFilter = document.querySelector("#filterUserSearch").value;
  let userJson;
  try {
    let response = await fetch(`api/filteredResult?profession=` + inputtedFilter)
    userJson = await response.json();
  } catch (error) {
    userJson = {
      status: 'error',
      error: error
    }
  }
  if (userJson.status == 'error') {
    document.getElementById("search_users_results").innerText = "There was an error: " + userJson.error;
  } else {
      if (userJson.length == 0) {
        document.getElementById("search_users_results").innerHTML = '<h5 class="card-title">No results found</h5>';
      } else {
        let userHtml = userJson.map(userInfo => {
            return `
              <div onclick="openProfile(this.id)" class="card click" id="${userInfo._id}" style="width: 18rem;">
                    <!--<img class="card-img-top" src=" alt="${userInfo.username}'s profile picture">-->
                    <div class="card-body">
                        <h5 class="card-title">${userInfo.full_name}</h5>
                        <p class="card-text">Username: ${userInfo.username}</p>
                        <p class="card-text">Interests: ${userInfo.interest}</p>
                        <p class="card-text">Major: ${userInfo.major}</p>
                        <p class="card-text">Profession: ${userInfo.profession}</p>
                        <a href="users/profile?username=${userInfo.username}" class="btn btn-primary">Link to profile</a>
                    </div>
                </div>
            `
        }).join("\n");
        document.getElementById("search_users_results").innerHTML = userHtml;
      }
  }
}

// standard search function
async function searchUserFunction() {
  document.getElementById("search_users_results").innerHTML = "";
    let inputtedUsername = document.getElementById("searchUserInput").value;
    let userJson;
    try {
        let response = await fetch(`api/results?user=` + inputtedUsername)
        userJson = await response.json();
    } catch(error) {
        userJson = {
            status: 'error',
            error: error
        }
    }
    if (userJson.status == 'error') {
        document.getElementById("search_users_results").innerText = "There was an error: " + userJson.error;
    } else {
        if (userJson.length == 0) {
          document.getElementById("search_users_results").innerHTML = '<h5 class="card-title">No results found</h5>';
        } else {
          let userHtml = userJson.map(userInfo => {
              return `
                <div onclick="openProfile(this.id)" class="card mb-2 click" id="${userInfo._id}" style="width: 18rem;">
                      <!--<img class="card-img-top" src=" alt="${userInfo.username}'s profile picture">-->
                      <div class="card-body">
                          <h5 class="card-title">${userInfo.full_name}</h5>
                          <p class="card-text">Username: ${userInfo.username}</p>
                          <p class="card-text">Interests: ${userInfo.interest}</p>
                          <p class="card-text">Major: ${userInfo.major}</p>
                          <p class="card-text">Profession: ${userInfo.profession}</p>
                          <a href="users/profile?username=${userInfo.username}" class="btn btn-primary">Link to profile</a>
                      </div>
                  </div>
              `
          }).join("\n");
          document.getElementById("search_users_results").innerHTML = userHtml;
        }
    }
}

// get reccomended users
async function getRecommendations() {
  document.getElementById("recommendations_div").innerHTML = "";
  let userJson;
  try {
      let response = await fetch(`api/getRecommendations`)
      userJson = await response.json();
  } catch(error) {
      userJson = {
          status: 'error',
          error: error
      }
  }
 
  if (userJson.status == 'error') {
      document.getElementById("recommendations_div").innerText = "There was an error: " + userJson.error;
  } else {
      if (userJson.length == 0) {
        document.getElementById("recommendations_div").innerHTML = '<h5 class="card-title">No recommendations found, try refreshing recommendations</h5>';
      } else {
        let userHtml = userJson.map(userInfo => {

            return `
                <div onclick="openProfile(this.id)" class="card click mb-2" id="${userInfo._id}" style="width: 18rem;">
                    <!--<img class="card-img-top" src=" alt="${userInfo.username}'s profile picture">-->
                    <div class="card-body">
                        <h5 class="card-title">${userInfo.full_name}</h5>
                        <p class="card-text">Username: ${userInfo.username}</p>
                        <p class="card-text">Interests: ${userInfo.interest}</p>
                        <p class="card-text">Major: ${userInfo.major}</p>
                        <p class="card-text">Profession: ${userInfo.profession}</p>
                        <a href="users/profile?username=${userInfo.username}" class="btn btn-primary">Link to profile</a>
                    </div>
                </div>
            `

        }).join("\n");
        document.getElementById("recommendations_div").innerHTML = userHtml;
      }
  }
}

// opens larger profile card on dashboard/home page
async function openProfile(id){
  document.getElementById("chosenUser").innerHTML = "";
  let userJson;
  try {
      let response = await fetch(`api/allUser`)
      userJson = await response.json();
  } catch(error) {
      userJson = {
          status: 'error',
          error: error
      }
  }
  if (userJson.status == 'error') {
      document.getElementById("recommendations_div").innerText = "There was an error: " + userJson.error;
  } else {
      if (userJson.length == 0) {
        document.getElementById("recommendations_div").innerHTML = '<h5 class="card-title">No recommendations found, try refreshing recommendations</h5>';
      } else {
        let userHtml = userJson.map(userInfo => {

            if(userInfo._id === id) {
              return `
              <div class="card" id="${userInfo._id}" style="width: 33rem;">
              <!--<img class="card-img-top" src=" alt="${userInfo.username}'s profile picture">-->
              <div class="card-body">
                  <h5 class="card-title">${userInfo.full_name}</h5>
                  <p class="card-text">Username: ${userInfo.username}</p>
                  <p class="card-text">Interests: ${userInfo.interest}</p>
                  <p class="card-text">Major: ${userInfo.major}</p>
                  <p class="card-text">Profession: ${userInfo.profession}</p>
                  <a href="users/profile?username=${userInfo.username}" class="btn btn-primary">Link to profile</a>
                  <div class="card-body" id="chatOutput"></div>
                  <p mt-5>Leave feedback for user:</p>
                  <input id="chatInput"></input>
                  <button id="${id}" onclick="postChat(this.id);openProfile(this.id);" class="btn btn-primary btn-sm">Send</button>
              </div>
             </div>
              `
            }
        }).join("\n");
        document.getElementById("chosenUser").innerHTML = userHtml;
        
      }
  }

    document.getElementById("chatOutput").innerHTML = "";
    
    let chatJson;
    try {
        let response = await fetch(`/api/allChat`)
        chatJson = await response.json();
    } catch(error) {
        chatJson = {
            status: 'error',
            error: error
        }
    }
  
    if (chatJson.status == 'error') {
        document.getElementById("chatOutput").innerText = "There was an error: " + chatJson.error;
    } else {
        if (chatJson.length == 0) {
          document.getElementById("chatOutput").innerHTML = '<h5 class="card-title">No chats!</h5>';
        } else {

          let arr = []
          chatJson.map(userInfo => {
  
              if(userInfo.userID == id){
                arr.push(userInfo)
              }

                
          }).join("\n");

          let userHtml = `
          <h5 class="card-text">Most Recent Feedback on User:</h5>
          <p class="card-text names">${arr[arr.length-1].full_name} ${arr[arr.length-1].created_date}</p>
          <p class="card-text"><strong>${arr[arr.length-1].chat}</strong></p>
        `
          
          document.getElementById("chatOutput").innerHTML = userHtml;
        }
    }
  }

// get comment/chat input
async function postChat(postID){
  let newChat = document.getElementById("chatInput").value;
  
  try{
      let response = await fetch(`api/chat`, {
          method: "POST",
          body: JSON.stringify({userID: postID, newChat: newChat}),
          headers: {'Content-Type': 'application/json'}
      })
      let responesJSON = await response.json();
      if(responesJSON.status == "error"){
          console.log("error:" + responesJSON.error);
      }
      return responesJSON;
  }catch(error){
      console.log("error:" + error);
  }

}

// like / unlike functions

async function loadLikes(userID){
    let usersJson
    try{
        let response = await fetch(`/users/getLikes?userID=${userID}`);
        usersJson = await response.json();
        if (usersJson.containsCurrent === "true") {
            document.getElementById("profile-like").innerHTML = "&#x2665; " + usersJson.likes
            document.getElementById("profile-like").onclick = function(){ unlikePost(userID)}
        } else {
            document.getElementById("profile-like").innerHTML = "&#x2661; " + usersJson.likes
            document.getElementById("profile-like").onclick = function(){ likePost(userID)}
        }
    }catch(error){
        usersJson =  {
            status: "error",
            error: "There was an error: " + error
        };
    }
}

async function likePost(userID){
    console.log(userID)
    try{
        let response = await fetch(`/users/likeUser`, 
            { method: "POST", body: JSON.stringify({userID: userID}), headers: {'Content-Type': 'application/json'}})
        let responesJSON = await response.json();
        if(responesJSON.status == "error"){
            console.log("error:" + responesJSON.error);
        }else{
            loadLikes(userID);
        }
        return responesJSON;
    }catch(error){
        console.log("error:" + error);
    }
}


async function unlikePost(userID){
    try{
        let response = await fetch(`/users/unlikeUser`, 
            { method: "POST", body: JSON.stringify({userID: userID}), headers: {'Content-Type': 'application/json'}})
        let responesJSON = await response.json();
        if(responesJSON.status == "error"){
            console.log("error:" + responesJSON.error);
        }else{
            loadLikes(userID);
        }
        return responesJSON;
    }catch(error){
        console.log("error:" + JSON.stringify(error));
    }
}

// prevent xss attacks
const escapeHTML = str => str.replace(/[&<>'"]/g, 
  tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
}[tag]));

// get user chats/comments for display on profile page
async function openChat(userID) {
  try{
      let response = await fetch(`/api/getChat?user=` + userID)
      let responseJSON = await response.json();
      if(responseJSON.status == "error"){
          console.log("error:" + responseJSON.error);
      }

      let commentsMap = responseJSON.map(comment => {
        return `
        <div><h5>
            ${comment.created_date} 
                <div>
                    ${comment.full_name}:
                </div> 
                <div>
                    ${escapeHTML(comment.chat)}
                </div>
    </h5></div>
        `
      }).join("\n");


      

      document.getElementById("userComments").innerHTML = commentsMap;


      return responseJSON;
  }catch(error){
      console.log("error:" + JSON.stringify(error));
  }
}