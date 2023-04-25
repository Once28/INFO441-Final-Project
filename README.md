# INFO 441 - Dawg Network
Eric Latham, Jared Lim, Justin Zeng, Dhruv Karia

# Project Description
Our team plans to build a real-time networking chat application where users can login / signup, invite other users, like posts, and post comments on each others' profiles.

Our main audience will specifically be UW students, staff, mentors, advisors, professors, but outside of UW it will include recruiters/employers. Basically, the main audience using this application will be anyone affiliated with UW but accessible by outside employers. 

Our audience wants to use our application to be able to connect with mentors, professors and recruiters.

We want to build this application because we feel like UW students sometimes have a hard time trying to communicate and coordinate with professional/alumnis for coffee chats and we see this as a solution to this problem space.

# Technical Description
- Client: 
  - Handles input (Profile creation, updates, chat messages etc.)
  - First iteration will be done using solely HTML/CSS and vanilla Javascript.
  - Time permitting, we plan to convert to React.js for a better, more efficient, and easy to update user experience.
- Server: 
  - Processes inputs from the client
  - Coordinates between the client and database to provide the correct data to the user
  - Authentication will also be handled here. This will be done using Azure.
- Database: 
  - Mongodb (NoSQL) will be used to store data.
## Architectural Diagram Mapping
![interaction architecture](diagrams/441Final.jpg?raw=true)
[Link](https://miro.com/app/board/uXjVOLkZiag=/)
## User Stories Table
| Priority | User                               | Description                                                                                               | Technical Implementation                                                                             |
| -------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| P0       | As a UW student                    | I want to talk to people in the industry and connect with employers                                       | Comment functionality using **user-oriented search filtering** to link students with mentors, employers, and recruiters         |
| P1       | As an employer                     | I want to connect with students who have an interest in my field who can also be potential employees      | Comment functionality using **user-oriented search filtering** to link employers with students                                  |
| P2       | As UW staff (advisors, professors) | I want to connect with UW students to know my students better and know their aspirations or opportunities | Comment functionality using **user-driven inputs** to link students with staff                                      |
| P3       | As a UW student                    | I want to create a profile to advertise myself to potential employers                                     | Editable user-friendly profile page using **acessible, user-centric** frontend. Logging in / Signing up handled by **Azure** |
| P4       | As an alumni                       | I want to help give advice to other students and connect with former professors/advisors                  | Search functionality to find students, staff and employers using search **API** endpoint                 |
| P5       | As a UW student                    | I want to view the feedback/comments and likes of certain employees / professors / employers etc                                        | Chat/Comment logs stored/retrieved using **MongoDB**                                                             |

# API Endpoints
**Authentication:**

- /signin
  - Authenticates user via Azure
- /signout
  - Delete user’s session and logs out
- /error
  - Handle login and general server errors that may occur
- /unauthorized
  - Deny access to matchmaking if not logged into a UW Microsoft account

**Users: /users**

- **PUT**
  - /profile/update
    - Updates users displayed name, classes, other profile info etc.
- **GET**
  - /login
    - Return current user session
  - /profile/:username
    - Redirects to specified profile page
  - /profile/edit
    - Edits a user's profile page
  - /profile/getLikes
    - gets a user's profile and amount of likes they have
    
- **POST**
  - /likeUser
    - Likes a user's profile
  - /unlikeUser
    - Unlikes a user's profile
  - api/profile
    - updates a user's session

**Search: /api**

- **GET**
  - /results?query=
    - Returns lists of profiles with a specified query
  - /filteredResult
    - Return profiles with specified profession query
  - /getRecommendation
    - returns a list of recommendations from all profiles
  - /allUsers
    - returns a list of all the users


**Chat: /chat**
- **POST**
  - /post
    - Connects a user and creates a new chat 
- **GET**
  - /get/allChat
    - Finds all the chats in the database and returns all of the chats
  - /get/getChat
    - Finds a chat from a specified user id

# Database Schema

**Chat**
- ._id: Key
- full_name: String
- chat: String
- creaed_date: Date
- userID: String

**User:**
- _id: Key
- username: String
- full_name: String
- email: String
- interest: String
- major: String
- grad_date: Date
- profession: String
- likes: [String]
