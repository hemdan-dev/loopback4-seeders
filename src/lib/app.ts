import * as fs from 'fs';
import * as path from 'path';

export class Loopback4Seeder {
    constructor(
        private selectedPath: string = null,
        private pathIncluded: string[] = [
            //get the paths with current directory
            path.resolve(process.cwd(),"dist/src/seeders"),
            path.resolve(process.cwd(),"dist/seeders"),
        ],
        private applicationPaths = [
            path.resolve(process.cwd(),"dist/src/application.js"),
            path.resolve(process.cwd(),"dist/application.js"),
        ]
    ){
        //if seeders path implemented just add the new path
        if(this.selectedPath) this.pathIncluded.unshift(this.selectedPath);
    }

    //start seeding from directory
    async startSeeding(){
        let foundPath = false;
        for(let pathData of this.pathIncluded){
            //if sedders folder is not exist in 
            if(this.directoryOrFileExists(pathData)) {
                this.selectedPath = pathData;
                foundPath = true;
            }
        }
        //if no path is founded just throw error
        if(!foundPath) {
            console.log("Cannot find seeders folder in project!");
            //process.exit();
            return false;
        }
        //start app
        const app = await this.fetchApplication();
        if(!app) return null;
        //start seeding data
        await this.DBSeed(app,this.selectedPath);
        return this.selectedPath;
    }

    //check if application exist
    async fetchApplication(){
        let appPath: string | null = null;
        for(let app of this.applicationPaths){
            const isAppExist = this.directoryOrFileExists(app);
            if(isAppExist) appPath = app;
        }
        //if no app found just return null and tell the user about that
        if(!appPath) {
            console.log("Can't find application");
            return null;
        }
        //load app from file
        let app = require(appPath);
        //create a new app instance
        app = new (Object.values(app)[0] as any);
        //boot lb4 app
        await app.boot();
        return app;
    }

    //check if directory is exist
    directoryOrFileExists(filePath: string){
        return fs.existsSync(filePath);
    }

    //seed data function
    async DBSeed (app: any, seedsPath: string) {
        const getAllSeed = require(seedsPath);
        const models = Object.entries(getAllSeed);
        for (let [modelName, data] of models) {
          const test = new (data as any)(app);
          const repository = test.repository;
          const getRepository = await app.getRepository(repository);
          test.updateRepository(getRepository);
          //run seed
          await test.run();
        }
    }
}