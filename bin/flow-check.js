import {execFileSync} from 'child_process';
import flowBin from 'flow-bin';

try {
	execFileSync(flowBin, ['check'], {stdio: 'inherit'});
} catch (e) {
	process.exit(1);
}
