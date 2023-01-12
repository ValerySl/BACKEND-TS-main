import Koa from "koa"
import bodyParser from "koa-bodyparser"
import cors from '@koa/cors'
import Router from "koa-router"
import env from './env'
import { resolve } from 'path'
import { Server } from 'http'
import {bootstrapControllers} from "amala"

const app = new Koa()


export default async function () {
    const router = new Router()
    await bootstrapControllers({
        app: app,
        router: router,
        basePath: '/',
        controllers: [resolve(__dirname, '../controllers/*')],
        disableVersioning: true
    })
    app.use(cors({ origin: '*' }))
    app.use(bodyParser())
    app.use(router.routes())
    app.use(router.allowedMethods())
    return new Promise<Server>((resolve, reject) => {
        const connection = app
        .listen(env.PORT)
        .on('listening', () => {
            console.log(`HTTP is listening on ${env.PORT}`)
            resolve(connection)
        })
        .on('error', reject)
    })
}



