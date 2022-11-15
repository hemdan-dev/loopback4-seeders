export abstract class SeedersBase {
    public abstract repository: any;
    private app: any;
  
    constructor(app: any) {
      this.app = app;
    }
  
    abstract run();
  
    private updateRepository(repository: any) {
      this.repository = repository;
    }
}
  