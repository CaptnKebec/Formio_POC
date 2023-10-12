import axios from 'axios'

const baseUrl = 'https://hq-dev-formio-wa.azurewebsites.net/uwjhceuwypyqlwi/'

export module DataService {

    
    export class Data{
        // private _axios: any;
       
        // public constructor(connection: any) {
   
        //     if (connection === null || connection == undefined) throw "Connexion on définie";
     
        //     this._axios = connection;

          
        // }
        

        getUserToken(): Promise<any> {

            const httpRequestUrl = `${baseUrl}user/login`;

            const data = {
               data: {
                    "email": "bob@aa.com",
                    "password": "Hemaqc01"
                }
            }

            return axios.post(httpRequestUrl,data)
                .then(function (response:any) {
                    return Promise.resolve(response);
                })
                .catch(function (error:any) {
                    console.log(error);
                    return Promise.reject(error);
                });
        }

        adminLogin(): Promise<any> {

            const httpRequestUrl = `${baseUrl}admin/login`;

            const data = {
               data: {
                    "email": "projectadmin@aa.com",
                    "password": "Hemaqc01"
                }
            }
            const adminConfig = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            return axios.post(httpRequestUrl,data, adminConfig)
                .then(function (response:any) {
                    return Promise.resolve(response);
                })
                .catch(function (error:any) {
                    console.log(error);
                    return Promise.reject(error);
                });
        }

        getDownloadToken(tokenAdmin:any): Promise<any> {

            const downloadTokenHeaders = {
                headers: {
                    'x-jwt-token': tokenAdmin,
                    'x-expire': 3600,
                    'x-allow': 'GET:/project/65046e578d4468f06fe23533/form/650836db8d4468f06fe2577c/submission/650836ea8d4468f06fe25866/download'
                }
            }

            const httpRequestUrl = 'https://hq-dev-formio-wa.azurewebsites.net/project/65046e578d4468f06fe23533/';

            return axios.get(httpRequestUrl + 'token',downloadTokenHeaders)
                .then(function (response:any) {
                    return Promise.resolve(response);
                })
                .catch(function (error:any) {
                    console.log(error);
                    return Promise.reject(error);
                });
        }


        getSubmissions(token:any): Promise<any> {

            const httpRequestUrl = `${baseUrl}contact/submission`;

            const config = {
                headers: {
                    'x-jwt-token': token
                }
            };


            return axios.get(httpRequestUrl,config)
                .then(function (response:any) {
                    return Promise.resolve(response);
                })
                .catch(function (error:any) {
                    console.log(error);
                    return Promise.reject(error);
                });
        }



        getPdf(downloadToken:any): Promise<any> {

            return axios({
                method: 'get',
            url:`${baseUrl}form/650836db8d4468f06fe2577c/submission/650836ea8d4468f06fe25866/download?token=` + downloadToken.data.key,
            responseType: 'arraybuffer',  // This is important
            responseEncoding: 'binary'    // This is important
            })
                .then(function (response:any) {
                    return Promise.resolve(response);
                })
                .catch(function (error:any) {
                    console.log(error);
                    return Promise.reject(error);
                });
        }
    }
}