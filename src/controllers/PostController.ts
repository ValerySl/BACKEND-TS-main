import {Controller, Ctx, Req, Body, Get, Post, Delete, Query, Flow, Params, Version} from 'amala'



@Controller('/')
export class PostController {
    @Get('/hello')
    async simpleGetV1() {
        return 'world v1';
    }
}