import Axios from 'axios'

const auth_key = "auth-user"
let auth = JSON.parse(localStorage.getItem(auth_key))
const user = auth ? auth.user : ""
const jwt = auth ? auth.jwt : ""


const api_endpoint 
= process.env.ADMIN_ENDPOINT || "http://localhost:1337"

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

    getApiHeader() {
        let jwt = JSON.parse(localStorage.getItem('auth-user')).jwt
        if (jwt !== "") {
            return {
                headers: {
                    Authorization: "Bearer " + jwt,
                },
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
                return {
                    success : true,
                    user: res.data,

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
                return {
                    success : true,
                    user: res.data,
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

    async addRedeemed ({rewardId,userId}) {
        try {
            let url = `${api_endpoint}/redeemeds`
            let body = {
                users_permissions_user : userId,
                reward: rewardId
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
}