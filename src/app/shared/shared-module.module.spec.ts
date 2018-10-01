import { SharedModule } from './shared-module.module';

describe('SharedModuleModule', () => {
  let sharedModuleModule: SharedModule;

  beforeEach(() => {
    sharedModuleModule = new SharedModule();
  });

  it('should create an instance', () => {
    expect(sharedModuleModule).toBeTruthy();
  });
});
