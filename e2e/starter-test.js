describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show Hallo Welt', async () => {
    await expect(element(by.text('Hallo Welt'))).toBeVisible();
  });
});
