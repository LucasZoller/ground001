import express from "express"
import "dotenv/config"

//Import middlewares
import helmet from "helmet"
import cookieParser from "cookie-parser"
import { credentials } from "./middlewares/credentials.js"
import { verifyAccessToken } from "./middlewares/veryfyAccessToken.js"

//Import controllers
import { readVid001 } from "./controllers/read_vid_001.js"
import { createVid001 } from "./controllers/create_vid_001.js"
import { editVid001 } from "./controllers/edit_vid_001.js"
import { searchVid001 } from "./controllers/search_vid_001.js"
import { readVid_by_productNumber } from "./controllers/read_vid_by_productNumber.js"
import { readUser001 } from "./controllers/read_user_001.js"
import { searchUser001 } from "./controllers/search_user_001.js"
import { createUser001 } from "./controllers/create_user_001.js"
import { login001 } from "./controllers/login_001.js"
import { publishAtFromRt } from "./controllers/publishAtFromRt.js"
import { userAreaTest } from "./controllers/userAreaTest.js"
import { cookieTest } from "./controllers/cookieTest.js"

const app = express()
const port = process.env.PORT

//Middlewares
app.use(helmet())
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())
app.use(credentials)

//Handlers
app.get("/read_vid_001", readVid001)
app.post("/create_vid_001", createVid001)
app.post("/edit_vid_001", editVid001)
app.post("/search_vid_001", searchVid001)
app.get("/read_vid_by_productnumber", readVid_by_productNumber)
app.get("/read_user_001", readUser001)
app.post("/search_user_001", searchUser001)
app.post("/create_user_001", createUser001)
app.post("/login001", login001)
app.post("/publish_at_from_rt", publishAtFromRt)
app.post("/test", cookieTest)

//User Area
app.get("/user-area-test", verifyAccessToken, userAreaTest)

//Run
app.listen(port, () => {
  console.log("The server running on port 4000🎑" + process.env.MO)
})
