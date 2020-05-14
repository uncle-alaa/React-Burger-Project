import axios from "axios"

const instance = axios.create({
  baseURL: "https://react-my-burger-fc402.firebaseio.com/",
})

export default instance
