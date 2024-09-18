import type { StorybookConfig } from '@storybook/angular';
const path = require("path");

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      styles: path.resolve(__dirname, '../src/styles.scss'),
    };
    return config;
  },
};
export default config;
