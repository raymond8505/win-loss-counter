const Client = require('ftp');
const fs = require('fs');
const package = require('./package.json');
const chalk = require('chalk');

const client = new Client();

const localPaths = package.deployConfig.localPaths;
const blacklist = package.deployConfig.blacklist;

let filesToSend = [];

const user = 'raymond@raymonds.recipes';
const pass = 'Stanpass4$';
const host = 'raymonds.recipes';

console.log(`Connecting to ${host} as ${user}`);

client.on('error',(err)=>{

    console.error(err.message);

    client.end();
});

const isBlacklisted = path => {

    for(let i = 0; i < blacklist.length; i++)
    {
        if(path.indexOf(blacklist[i]) !== -1) return true;
    }

    return false;
}

const getDirFilesToSend = dir => {

    let filesToCheck = fs.readdirSync(dir.local);
    let files = [];

    filesToCheck.forEach(path => {

        if(isBlacklisted(path))
        {
            console.log(chalk.bgRed(`Skipping`),chalk.red(`${path} matches blacklist`));
            return;
        }

        const localPath = dir.local + '\\' + path;
        const remote = dir.remote + '/' + path;
        const obj = {
            local : localPath,
            remote : remote
        } 

        if(fs.lstatSync(localPath).isDirectory())
        {
            //console.log(localPath,'is dir');
            files = [...files,...getDirFilesToSend(obj)];
        }
        else
        {
            //console.log(localPath,'is file');
            files.push(obj);
        }
    });

    return files;
}
/**
 * Parses an array of files or directories to build 
 * an array of files to send to the remote server
 * @param {Object} localPaths 
 */
const getFilesToSend = paths => {

    let pathsToSend = [];

    paths.forEach(path => {

        if(fs.lstatSync(path.local).isDirectory())
        {
            pathsToSend = [...pathsToSend,...getDirFilesToSend(path)]; 
        }
        else
        {
            //console.log(path.local,'is file');
            pathsToSend.push(path);
        }
    });

    return pathsToSend;
}

let curSend = 0;

client.on('ready',()=>{
    
    console.log('ftp ready');

    curSend = 0;

    filesToSend = getFilesToSend(localPaths);

    sendFile(curSend);
});

const sendFile = index => {

    if(index < filesToSend.length)
    {
        const file = filesToSend[index];

        client.put(file.local,file.remote,false,(err,stream)=>{

            if(err)
            {
                console.error(chalk.bgRed(` ERROR `),`couldn't send ${file.local} => ${file.remote}`);
            }
            else
            {
                console.log(chalk.bgGreen(` SUCCESS `), `${file.local} => ${file.remote}`);
                curSend++;
                sendFile(curSend);
            }
            
        })
    }
    else
    {
        console.log(chalk.green(`Finished uploading all files`));
        client.end();
    }
}

client.connect({
    host : host,
    user : user,
    password : pass
});