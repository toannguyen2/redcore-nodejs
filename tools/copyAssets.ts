import * as shell from "shelljs";

// Copy all the view templates
shell.cp("-R", "src/resources/", "build/resources/");

shell.cp("-R", "public/", "build/public/");
