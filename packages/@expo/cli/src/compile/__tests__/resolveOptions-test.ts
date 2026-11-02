import { resolveOptions } from '../resolveOptions';

describe(resolveOptions, () => {
  it.each([
    { platform: 'ios', outputType: 'app' },
    { platform: 'android', outputType: 'apk' },
  ] as const)(`defaults --output-type to $outputType for $platform`, ({ platform, outputType }) => {
    expect(resolveOptions(platform, { dev: true })).toEqual({ mode: 'development', outputType });
  });

  it(`rejects an unknown --output-type`, () => {
    expect(() => resolveOptions('ios', { dev: true, 'output-type': 'exe' })).toThrow(
      'Invalid option: --output-type exe. Valid options are: app, ipa'
    );
  });

  it.each([
    { platform: 'ios', target: 'the simulator' },
    { platform: 'android', target: 'all architectures' },
  ] as const)(`rejects --device for $platform`, ({ platform, target }) => {
    expect(() => resolveOptions(platform, { device: 'my-device' })).toThrow(
      `Device builds are not supported yet. Omit --device to build for ${target}.`
    );
  });
});
