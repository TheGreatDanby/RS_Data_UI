import { exec } from "node:child_process";

// Function to execute a shell command
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

// Check if Docker is running
runCommand("docker info")
  .then(() => {
    console.log("Docker is running.");
    // Check if container is running
    const containerName = "local-mongo";
    return runCommand(`docker ps -q -f name=^/${containerName}$`);
  })
  .then((output) => {
    if (output) {
      console.log("Container is already running.");
    } else {
      console.log("Starting container...");
      // Replace with your docker run command or docker start if the container exists
      return runCommand(
        `docker run --name my-container --restart always -d your_image_name`
      );
    }
  })
  .catch((error) => {
    console.error("Docker is not running or another error occurred:", error);
    // Optional: Start Docker on macOS, for example
    // runCommand('open /Applications/Docker.app');
  });
