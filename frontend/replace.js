import fs from 'fs';
import path from 'path';

const directory = './src';

const replaceInFile = (filePath) => {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    fileContent = fileContent.replace(/(\?\?=)/g, '= (typeof $1 === "undefined") ? $1 : $1');
    fs.writeFileSync(filePath, fileContent, 'utf8');
};

const processDirectory = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.lstatSync(filePath);
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (stat.isFile() && file.endsWith('.js')) {
            replaceInFile(filePath);
        }
    });
};

processDirectory(directory);
