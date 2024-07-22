import 'dotenv/config';
import { Server } from './presentation/server';
import { envs } from './config/plugins/envs.plugins';

(async () => {
  main();
})();

function main() {
  Server.start();
}
