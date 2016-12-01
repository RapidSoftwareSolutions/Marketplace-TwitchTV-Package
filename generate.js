const fs   = require("fs");
const lib  = require("./lib");
const url  = require('url');
const path = require("path");

let main = () => {
    let ctrlFile   = path.join(__dirname, "ctrl_metadata.json"),
        api        = path.join(__dirname, "control.json"),
        endpoints  = JSON.parse(fs.readFileSync(ctrlFile, "utf8")).blocks,
        usedFunc   = {};
        apiObj     = {};

    for (let i = 0; i < endpoints.length; i++) {
        let block = endpoints[i];

        if(!block.url || !block.description || !block.method || /http/.test(block.url)) 
            console.log(block.name);

        if(usedFunc[block.name]) 
            console.log('fd', block.name);

        usedFunc[block.name] = 1;
        apiObj[block.name]   = {
            url:    block.url.charAt(0) == '/' ? block.url : '/' + block.url,
            method: block.method,
            args:   {},
        };

        let usedParams = {};

        for (let j = 0; j < block.args.length; j++) {
            let arg = block.args[j],
                apiArg = arg.orig || arg.name;

            if(arg.object) {
                apiObj[block.name].tree = true;
                apiArg = arg.object + '.' + apiArg;
            }

            if(usedParams[arg.name] || !arg.name) 
                console.log(block.name, arg.name)

            usedParams[arg.name] = 1;

            if(~block.url.indexOf(arg.name)) apiArg = '!' + apiArg;
            if(/Required:/.test(arg.info))   apiArg = '$' + apiArg;

            apiObj[block.name].args[arg.type + '|' + arg.name] = apiArg;
        }
    }

    lib.safeSave(api, JSON.stringify(apiObj, undefined, 4));
}

let metadata = () => {
    let metaFile   = path.join(__dirname, "metadata.json"),
        ctrlFile   = path.join(__dirname, "ctrl_metadata.json"),
        endpoints  = JSON.parse(fs.readFileSync(ctrlFile, "utf8"));

    for (let i = 0; i < endpoints.blocks.length; i++) {
        for (let j = 0; j < endpoints.blocks[i].args.length; j++) {
            delete endpoints.blocks[i].args[j].orig;
            delete endpoints.blocks[i].args[j].object;
        }

        delete endpoints.blocks[i].method;
        delete endpoints.blocks[i].url;
    }

    lib.safeSave(metaFile, JSON.stringify(endpoints, undefined, 2));
}

main();
metadata();