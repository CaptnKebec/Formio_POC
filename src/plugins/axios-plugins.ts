// axios.ts
//Permet d'utiliser Axios sans avoir à l'instancier partout, on l'injecte au besoin
import axios from 'axios'
import type { App } from 'vue'


interface AxiosOptions {
    api: string,
    baseURL?: string
    withCredentials?: boolean
}

export default {
    install: (app: App, options: AxiosOptions) => {
        app.config.globalProperties[options.api] = axios.create({
            baseURL: options.baseURL,
            withCredentials: options.withCredentials
        })

        app.provide(options.api, app.config.globalProperties[options.api]);
    },

    installArray: (app: App, options: readonly AxiosOptions[]) => {
        const apisOptions = options || [];

        apisOptions.forEach(option => {
            app.config.globalProperties[option.api] = axios.create({
                baseURL: option.baseURL,
                withCredentials: option.withCredentials
            });

            app.provide(option.api, app.config.globalProperties[option.api]);
        })
    }
}