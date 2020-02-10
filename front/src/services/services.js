'use strict'
import axios from 'axios'
export function getPosts () {
  console.log('hola?')
  axios
    .get('https://localhost:3443/blog/posts')
    // .then(res => {
    //   console.log(res.data.posts)
    // })
}
// async function sendLogin () {
//     const url = 'https://localhost:3443/login'
//     await axios.request({
//       url,
//       auth: {
//         username: this.username,
//         password: this.password
//       },
//       method: 'post'
//     })
//       .then((response) => {
//         this.errorMessage = ''
//         const token = response.data.token
//         const userRole = response.data.userData.role
//         const username = response.data.userData.username
//         const nickname = response.data.userData.nickname
//         this.addDataLS(token, userRole, username, nickname)
//         this.username = ''
//         this.password = ''
//         window.location = '/'
//       })
//       .catch((error) => {
//         if (error.response.status === 401) { this.isInvalid = true }
//       })
//   }
