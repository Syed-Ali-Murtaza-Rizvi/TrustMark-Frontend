const backendDomain = import.meta.env.VITE_API_URL;

const summaryApi={
    signUp:{
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    login:{
        url: `${backendDomain}/api/login`,
        method: "post"
    },
    currentUser:{
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    userLogout:{
        url: `${backendDomain}/api/user-logout`,
        method: "get"
    }
    
}

export default summaryApi