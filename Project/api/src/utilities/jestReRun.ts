import { exec } from 'child_process';

const runTests = (iterations: number): void => {
  let count = 0;
  const results: string[] = [];

  const run = (): void => {
    if (count >= iterations) {
      console.log('All iterations completed.');
      console.log('Failures:', results);
      return;
    }

    console.log(`Running iteration ${count + 1}/${iterations}...`);
    exec('npm run test', (error, stdout, stderr) => {
      const output = stdout || stderr || '';
      if (error) {
        console.error(`Error in iteration ${count + 1}:`, error.message);
        results.push(output);
      }

      console.log(output);
      count++;
      run();
    });
  };

  run();
};

runTests(10); // Adjust the number of iterations as needed
