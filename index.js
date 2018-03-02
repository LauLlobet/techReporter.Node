var open = require('mac-open');
var fs = require('fs');
var google = require('google');

var MarkdownIt = require('markdown-it'),
md = new MarkdownIt();

var technologyName = "not passed by argument!"

process.argv.forEach(function (val, index, array) {
    technologyName = val;
  });


  async function queryIt(query2, resultsNumber){
    google.resultsPerPage = 25
    var nextCounter = 0
    
    var p = new Promise( done => {
        var result = "Query: "+query2+"\n";
        google(query2, function (err, res){
            if (err) console.error(err)
            for (var i = 0; i < resultsNumber; ++i) {
                var link = res.links[i];
                //[I'm an inline-style link](https://www.google.com)
                result += "* [" +link.title + "]("+link.href+")\n"
                result += "   *"+link.description+"\n"
            
            }
            done(result+ "\n")
        });
      });

    var text = await p
    return text
}

async function doIt(){
    var result = "### Profiling of "+technologyName+"\n ";

    result += "IS IT ALREADY CONSIDERED FROM A MODERN VIEW\n"
    result += "===========================================\n"
    result += await queryIt("DDD "+technologyName,3)
    result += await queryIt("Ports And Adapters "+technologyName,3)

    result += "IT'S BOUNDS\n"
    result += "===========================================\n"
    result += await queryIt("Limits of "+technologyName,4)

    result += "ARE COMMON PROBLEMS ADRESED SOMEWHERE \n"
    result += "===========================================\n"
    result += await queryIt("Legacy Code "+technologyName,4)
    result += await queryIt("Maximum Users "+technologyName,4)
    

    result += "INTERFACES \n"
    result += "===========================================\n"
    result += await queryIt("TDD "+technologyName,3)
    result += await queryIt("JDBC "+technologyName,3)
    result += await queryIt("API "+technologyName,3)

    console.log(result)

    var result = md.render(result);
    fs.writeFile("./index.html", result, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
    open('./index.html');

}
doIt()
