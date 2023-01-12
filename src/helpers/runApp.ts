import Koa from "koa"
import bodyParser from "koa-bodyparser"
import cors from '@koa/cors'
import Router from "koa-router"
import  { config }  from "../config"
import { resolve } from 'path'
import { Server } from 'http'
import {bootstrapControllers} from "amala"
import healthcheck from "../routes/healthcheck"

const app = new Koa()

const PORT = config.port

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
    app.use(healthcheck.routes())
    app.use(router.allowedMethods())
    return new Promise<Server>((resolve, reject) => {
        const connection = app
        .listen(PORT)
        .on('listening', () => {
            console.log(`HTTP is listening on ${PORT}`)
            resolve(connection)
        })
        .on('error', reject)
    })
}



