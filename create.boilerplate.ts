#!/usr/bin/env node

import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const boilerplateRepo =
  "https://github.com/vish-alz/nestjs-api-boilerplate.git";

function cloneBoilerplate(projectName: string): void {
  execSync(`git clone ${boilerplateRepo} ${projectName}`, { stdio: "inherit" });
  console.log(`Boilerplate cloned into ${projectName}`);
}

function installDependencies(projectName: string): void {
  console.log("Installing dependencies...");
  execSync(`cd ${projectName} && npm install`, { stdio: "inherit" });
  console.log("Dependencies installed.");
}

function createProject(projectName: string | undefined): void {
  if (!projectName) {
    console.error(
      'Please specify the project name or use the default name "my-app":'
    );
    console.log("  npx create-nestjs-api-boilerplate <project-name>");
    console.log("For example:");
    console.log("  npx create-nestjs-api-boilerplate my-app");
    process.exit(1);
  }

  console.log(
    `Creating a new NestJS project in ${path.resolve(projectName)}...`
  );
  cloneBoilerplate(projectName);
  installDependencies(projectName);
  console.log("Project setup complete. Happy coding!");
}

const projectName = process.argv[2] || "my-app";
createProject(projectName);
