import Axios from 'axios'

const auth_key = "auth-user"
let auth = JSON.parse(localStorage.getItem(auth_key))
const user = auth ? auth.user : ""
const jwt = auth ? auth.jwt : ""


const api_endpoint 
= process.env.VUE_APP_ENDPOINT || "http://localhost:1337"

export default{
    isAuthen () {
        return (user !== "" && (jwt != ""))
    },

    getUser () {
        return user
    },

    getJwt () {
        return jwt
    },
    getHeaders() {
        if (jwt !== "") {
          return {
            headers: {
              
              Authorization: `Bearer ${jwt}`,
            },
          };
        }
      },
    async login ({username, password}) {

        try {
            let url = `${api_endpoint}/auth/local`
            let body = {
                identifier: username,
                password: password
            }
            let res = await Axios.post(url, body)
            if (res.status === 200) {
                console.log(res.data);
                localStorage.setItem(auth_key, JSON.stringify(res.data))
                return {
                    success : true,
                    user: res.data.user,
                    jwt: res.data.jwt
                }
            } else {
                console.log("NOT 200",res);
            }

        } catch (e) {
            console.error(e);
            if (e.response.status === 400){
                return{
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            }
        }
    },
    logout(){
        localStorage.removeItem(auth_key)
    },

    async register ({username, email, password}) {
        try {
            let url = `${api_endpoint}/auth/local/register`
            let body = {
                username: username,
                email: email,
                password: password
            }
            let res = await Axios.post(url, body)
            if (res.status === 200) {
                localStorage.setItem(auth_key, JSON.stringify(res.data))
                return {
                    success : true,
                    user: res.data.user,
                    jwt: res.data.jwt
                }
            }else {
                console.log("NOT 200",res);
            }
        } catch (e){
            if (e.response.status === 400){
                return{
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            }
        }
    },
    async addFinished ({userId, activityId}) {
        try {
            let url = `${api_endpoint}/finisheds`
            let body = {
                activity: activityId,
                users_permissions_user : userId,
            }
            let res = await Axios.post(url, body)
            if (res.status === 200) {
                console.log(res.data);
                localStorage.setItem(auth_key, JSON.stringify(res.data))
                return {
                    success : true,
                    user: res.data.user,
                    jwt: res.data.jwt
                }
            } else {
                console.log("NOT 200",res);
            }

        } catch (e) {
            console.error(e);
            if (e.response.status === 400){
                return{
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            }
        }
    },
    async addPoint ({userId, newPoint}) {

        try {
            let url = api_endpoint+"/users/"+userId
            let body = {
                point : newPoint
            }
            let res = await Axios.put(url, body)
            if (res.status === 200) {
                console.log(res.data);
                localStorage.setItem(auth_key, JSON.stringify(res.data))
                return {
                    success : true,
                    user: res.data.user,
                    jwt: res.data.jwt
                }
            } else {
                console.log("NOT 200",res);
            }

        } catch (e) {
            console.error(e);
            if (e.response.status === 400){
                return{
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            }
        }
    },


}