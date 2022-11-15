#!/usr/bin/env node
import * as dotenv from "dotenv";
//load env file from project if exist
dotenv.config();
import { Loopback4Seeder } from "./lib/app";

//export base class interfaces
export * from "./lib/base";

(async () => {
    console.log("Started to seeding data");
    //start the application
    const app = new Loopback4Seeder();
    const seeded = await app.startSeeding();
    if(seeded) console.log("Seeded data successfully");
    process.exit(0);
})();

