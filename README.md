# Loopback 4 Seeders

[![LoopBack](<https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)

# Installation
> `npm i loopback4-seeders -D`

Now go to package.json, and add a new script for seeding

```
"scripts": {
    "seed": "lb4-seed"
}
```

## Now lets create our first seeder
By default the app will get seeders files from `src/seeders` folder

- First we need to create a new folder called `seeders` in `src` folder
- After that we need to create `seeders/index.ts` to export every seeder we will create
- Create a new file ends with `.seeder.ts`, in my case will be `test.seeder.ts`
- In our new file lets create a new class extending `SeedersBase` like the following code
```typescript
export class TestSeeder extends SeedersBase {
  //repository
  public repository: EntityCrudRepository<Test, typeof Test.prototype.id> = TestRepository as any;

  constructor(app: any) {
    super(app);
  }

  async run() {
    // logic
  }
}
```
- In repository property, just add your repository
- Now we need to export that class in `index.ts` we have created before
```typescript
export * from "./test.seeder";
```

Finally lets seed our database by hitting the following command :

> `npm run build && npm run seed`

You must see a seeding data message, then a successfull message

```bash
Started to seeding data
Seeded data successfull
```
## License

### MIT