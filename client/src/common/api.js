const backendApiUrl = 'http://localhost:8090/api';

export const backendApi={
    register:{ 
        url:`${backendApiUrl}/register`,
        method:'POST'
    },
    login:{
         url:`${backendApiUrl}/login`,
         method:'POST'
    },
    logout: {
        url:`${backendApiUrl}/logout`,
        method:'GET'
    },
    userData: {
        url:`${backendApiUrl}/user-data`,
        method:'GET'
    },
    users:{
        url:`${backendApiUrl}/users`,
        method:'GET'
    }
}