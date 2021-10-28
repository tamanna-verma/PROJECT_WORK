let minimist = require("minimist");
let jsdom = require("jsdom");
let axios = require("axios");
let excel = require("excel4node");
let fs = require("fs");
let pdf = require("pdf-lib");
let path = require("path");
const { spawn, execFile } = require("child_process");
let args = minimist(process.argv);
//node CricinfoExtracter.js --excel="WorlCup.csv" --dataFolder="data" --source="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results"
let responseKaPromise = axios.get(args.source);
let html = args.responseKaPromise;
responseKaPromise.then(function (response) {
  let html = response.data;
  let dom = new jsdom.JSDOM(html);
  let document = dom.window.document;

  let matches = [];
  let matchDivs = document.querySelectorAll("div.match-score-block");//querySelectorAll returns an array
  for (let i = 0; i < matchDivs.length; i++) {
    let matchDiv = matchDivs[i];//ek match ki div
    let match = {
      t1: " ",
      t2: " ",
      t1s: " ",
      t2s: " ",
      result: " "
      // ye ek match ka object hai , hume sare objects ko matches array me push krna hai , sare match object me match ki sari properties jayegi 
    };

    let resultSpan = matchDiv.querySelector("div.status-text>span");
    match.result = resultSpan.textContent;

    let teamParas = matchDiv.querySelectorAll("div.name-detail>p.name");
    match.t1 = teamParas[0].textContent;
    match.t2 = teamParas[1].textContent;

    let scoreSpans = matchDiv.querySelectorAll("div.score-detail>span.score");
    if (scoreSpans.length == 2) {
      match.t1s = scoreSpans[0].textContent;
      match.t2s = scoreSpans[1].textContent;
    }
    else if (scoreSpans.length == 1) {
      match.t1s = scoreSpans[0].textContent;
      match.t2s = "";
    }
    else {
      match.t1s = "";
      match.t2s = "";
    }
    matches.push(match);

    let matchesJSON = JSON.stringify(matches);
    fs.writeFileSync("matches.json", matchesJSON, "utf-8");
  }

  let teams = [];
  for (let i = 0; i < matches.length; i++) {
    PutTeamsInTeamsArrayIfMissing(teams, matches[i]);
    PutMatchesInAppropriateTeams(teams, matches[i]);

  }

  //This function will push all the teams in teams array , each team has its separate object , inside the object there will be all the matches that the team playes with its competitors
  function PutTeamsInTeamsArrayIfMissing(teams, match) {
    let t1index = -1;
    //checking if the team 1 is presnt in teams array or not 
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].name == match.t1) {
        t1index = i;
        break;
      }
    }
    // if team 1 is not present in the teams array then we need to push it in the teams array
    if (t1index == -1) {
      teams.push(
        {
          name: match.t1,
          matches: []

        }
      );

    }

    let t2index = -1;
    //checking if the team 2 is presnt in teams array or not 
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].name == match.t2) {
        t2index = i;
        break;
      }
    }
    // if team 2 is not present in the teams array then we need to push it in the teams array
    if (t2index == -1) {
      teams.push(
        {
          name: match.t2,
          matches: []

        }
      );

    }
  }
  //This function will push the data of each match of each team in teams array                                    
  function PutMatchesInAppropriateTeams(teams, match) {

    //  pushing data of team 1 matches in teams array

    let t1index = 0;
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].name == match.t1) {
        t1index = i;
        break;//ye hume pta chlgya ki match ki team 1 teams array me konse index pr hai
      }
    }

    //let team1=;//jis index par team 1 hai team array me us team ka object hai team1
    teams[t1index].matches.push
      (
        {
          Vs: match.t2,
          SelfScore: match.t1s,
          OpponentScore: match.t2s,
          result: match.result
        }
      );

    // pushing data of teams 2 of match in teams array // har time ka data 2 bar aayega , ek bar khudki team folder me aur ek opponent ki team folder me


    let t2index = 0;
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].name == match.t2) {
        t2index = i;
        break;//ye hume pta chlgya ki match ki team 1 teams array me konse index pr hai
      }
    }

    //let team2=teams[t2index];//jis index par team 1 hai team array me us team ka object hai team1
    teams[t2index].matches.push
      (
        {
          Vs: match.t1,
          SelfScore: match.t2s,
          OpponentScore: match.t1s,
          result: match.result
        }
      );



    // for(let i=0;i<teams.length;i++)
    // {
    //     if(teams[i].name==match.t1)
    //     {
    //         teams[i].matches.push(
    //             {
    //                 vs:match.t2,
    //                 selfscore:match.t1s,
    //                 oppscore:match.t2s,
    //                 result:match.result
    //             }
    //         );
    //     }

    // }

    // for(let i=0;i<teams.length;i++)
    // {
    // if(teams[i].name==match.t2)
    //     {
    //         teams[i].matches.push(
    //             {
    //                 vs:match.t1,
    //                 selfscore:match.t2s,
    //                 oppscore:match.t1s,
    //                 result:match.result
    //             }
    //         );
    // }
    // }


  }
  console.log(JSON.stringify(teams));



  let teamsJSON = JSON.stringify(teams);
  fs.writeFileSync("teams.json", teamsJSON, "utf-8");

  createExcelFileWithWorkBookAndWorkSheet(teams);//,args.excelWorkBook);
  createFolders(teams);

  // function createExcelFileWithWorkBookAndWorkSheet(teams,excelFileName)
  // {
  //     let wb=new excel.Workbook(); 
  //     for(let i=0;i<teams.length;i++)
  //     {
  //       let sheet=wb.addWorksheet(teams[i].name);
  //       sheet.cell(1,1).string("Vs");
  //       sheet.cell(1,2).string("Self Score");
  //       sheet.cell(1,3).string("Opponent Score");
  //       sheet.cell(1,4).string("Result");
  //       for(let j=0;i<teams[i].matches.length;i++)
  //       {

  //         sheet.cell(2+j,1).string(teams[i].matches[j].Vs);
  //         sheet.cell(2+j,2).string(teams[i].matches[j].SelfScore);
  //         sheet.cell(2+j,3).string(teams[i].matches[j].OpponentScore);
  //         sheet.cell(2+j,4).string(teams[i].matches[j].result);
  //       }
  //     }
  //     wb.write("args.excelWorkBook");                           
  // }

  function createExcelFileWithWorkBookAndWorkSheet(teams) {
    let wb = new excel.Workbook();
    for (let i = 0; i < teams.length; i++) {
      let sheet = wb.addWorksheet(teams[i].name);
      sheet.cell(1, 1).string("vs");
      sheet.cell(1, 2).string("Self Score");
      sheet.cell(1, 3).string("Opponent Score");
      sheet.cell(1, 4).string("result");

      for (let j = 0; j < teams[i].matches.length; j++) {
        sheet.cell(2 + j, 1).string(teams[i].matches[j].Vs);
        sheet.cell(2 + j, 2).string(teams[i].matches[j].SelfScore);
        sheet.cell(2 + j, 3).string(teams[i].matches[j].OpponentScore);
        sheet.cell(2 + j, 4).string(teams[i].matches[j].result);
      }
    }
    if (fs.existsSync(args.excelWorkBook) == false) {
      wb.write(args.excelWorkBook, "utf-8");
    }
  }

  function createFolders(teams) {
    if (fs.existsSync(args.dataFolder) == true) 
    {
      fs.rmdirSync(args.dataFolder, { recursive: true });
    }

    fs.mkdirSync(args.dataFolder);

    // if(fs.existsSync(args.dataFolder)==false)
    // {
    //   fs.mkdirSync(args.dataFolder)//ab bar bar code dubara run krne se phle data file delete nhi krni hogi ,agar phle se hogi to code dubara nhi bnayega
    // }

    for (let i = 0; i < teams.length; i++) {
      let teamFolderName = path.join(args.dataFolder, teams[i].name+".pdf");
      if (fs.existsSync(teamFolderName) == false) {
        fs.mkdirSync(teamFolderName);
      }
      for (let j = 0; j < teams[i].matches.length; j++) {
        let match = teams[i].matches[j];
        createMatchScoreCardPDF(teamFolderName, teams[i].name, match);
      }
    }
  }

  function createMatchScoreCardPDF(teamFolderName, selfName, match) {
    let matchFileName = path.join(teamFolderName, match.Vs);
   // fs.writeFileSync(matchFileName + ".pdf", "utf-8");//ekbar dekhre hai ki pdf file bnrhi hai ya nhi
    let TemplateFileBytes = fs.readFileSync("Template.pdf");
    let pdfDocKaPromise = pdf.PDFDocument.load(TemplateFileBytes);
    pdfDocKaPromise.then(function (pdfDoc) {
      let page = pdfDoc.getPage(0);

      page.drawText("WorldCup 2019",
        {

          x: 200,
          y: 800,
          size: 30,

        });

      page.drawText(selfName,
        {

          x: 305,
          y: 770,
          size: 10,

        });

      page.drawText(match.Vs,
        {

          x: 305,
          y: 748,
          size: 10,

        });
      page.drawText(match.SelfScore,
        {

          x: 305,
          y: 727,
          size: 10,

        });

      page.drawText(match.OpponentScore,
        {

          x: 305,
          y: 705,
          size: 10,

        });

      page.drawText(match.result,
        {

          x: 305,
          y: 683,
          size: 10,

        });


      let changedBytesKaPromise = pdfDoc.save();
      changedBytesKaPromise.then(function (changedBytes) {
        if (fs.existsSync(matchFileName+".pdf") == true) {
          fs.writeFileSync( matchFileName+"1.pdf", changedBytes);
        }
           else {
            fs.writeFileSync(matchFileName+".pdf",changedBytes);
          }
        


        //  if (fs.existsSync(matchFileName ) == true) {
        //    fs.writeFileSync(matchFileName + "1.pdf", changedBytes);
        //  }
        //  else {
        //    fs.writeFileSync(matchFileName,changedBytes);
        //  }
      });
    })
  }

})