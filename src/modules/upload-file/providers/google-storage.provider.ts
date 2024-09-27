import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
@Injectable()
export class GoogleStorageProvider {
    private googleStorage:Storage

    constructor() {
        this.googleStorage = new Storage({
            projectId:"",
            credentials:{
                
            }
        })
    }
}
