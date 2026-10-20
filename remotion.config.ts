import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// Keep exports separate from the Studio on port 3000.
Config.setRendererPort(3101);
