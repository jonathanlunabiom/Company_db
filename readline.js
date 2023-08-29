
function cb(){
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Want to exit?',res=>{
        if(res === 'y' || 'Y'){
            console.log('yes')
            return true;
        }else{
            return false;
        }
    })
}

module.exports = cb