const http = require("https");
const fs = require('fs');

const DATA_DIR = 'data';
// const mids = [
//   'm17987627229',
//   'm18562207540',
//   'm23856030443'
// ]

const mids = [
  {
    "id": "m11971875134"
  },
  {
    "id": "m12973961446"
  },
  {
    "id": "m15694056479"
  },
  {
    "id": "m16198093832"
  },
  {
    "id": "m17987627229"
  },
  {
    "id": "m18022294860"
  },
  {
    "id": "m18335293507"
  },
  {
    "id": "m18562207540"
  },
  {
    "id": "m19346189781"
  },
  {
    "id": "m20437822922"
  },
  {
    "id": "m22226000006"
  },
  {
    "id": "m23034645730"
  },
  {
    "id": "m23856030443"
  },
  {
    "id": "m24646212096"
  },
  {
    "id": "m26382252918"
  },
  {
    "id": "m27011110220"
  },
  {
    "id": "m29335039168"
  },
  {
    "id": "m29762702313"
  },
  {
    "id": "m30154760946"
  },
  {
    "id": "m31210244891"
  },
  {
    "id": "m31332124917"
  },
  {
    "id": "m34348813333"
  },
  {
    "id": "m34849594045"
  },
  {
    "id": "m36044855596"
  },
  {
    "id": "m36270891366"
  },
  {
    "id": "m37466380047"
  },
  {
    "id": "m39628327909"
  },
  {
    "id": "m39722661125"
  },
  {
    "id": "m39744089052"
  },
  {
    "id": "m40107669879"
  },
  {
    "id": "m41600055188"
  },
  {
    "id": "m42048147014"
  },
  {
    "id": "m42840042121"
  },
  {
    "id": "m44152547475"
  },
  {
    "id": "m46212260511"
  },
  {
    "id": "m46609063233"
  },
  {
    "id": "m48132942601"
  },
  {
    "id": "m48554723114"
  },
  {
    "id": "m49447587193"
  },
  {
    "id": "m49479217113"
  },
  {
    "id": "m49585356166"
  },
  {
    "id": "m50328542630"
  },
  {
    "id": "m51547189469"
  },
  {
    "id": "m55086121563"
  },
  {
    "id": "m55467390243"
  },
  {
    "id": "m55550067473"
  },
  {
    "id": "m55673323853"
  },
  {
    "id": "m55856272997"
  },
  {
    "id": "m56545706471"
  },
  {
    "id": "m56897589961"
  },
  {
    "id": "m57949701903"
  },
  {
    "id": "m58425559819"
  },
  {
    "id": "m58481455311"
  },
  {
    "id": "m59435315869"
  },
  {
    "id": "m59462511211"
  },
  {
    "id": "m59474300954"
  },
  {
    "id": "m61120071665"
  },
  {
    "id": "m61366940955"
  },
  {
    "id": "m63047896618"
  },
  {
    "id": "m64538937574"
  },
  {
    "id": "m64609254804"
  },
  {
    "id": "m64912127548"
  },
  {
    "id": "m65228664838"
  },
  {
    "id": "m65277343866"
  },
  {
    "id": "m65279113549"
  },
  {
    "id": "m66352250676"
  },
  {
    "id": "m66878566295"
  },
  {
    "id": "m67976725177"
  },
  {
    "id": "m68976349488"
  },
  {
    "id": "m70245920718"
  },
  {
    "id": "m71194966760"
  },
  {
    "id": "m71550650491"
  },
  {
    "id": "m74127884002"
  },
  {
    "id": "m75431465883"
  },
  {
    "id": "m75999754196"
  },
  {
    "id": "m76050900778"
  },
  {
    "id": "m76329191349"
  },
  {
    "id": "m78055675350"
  },
  {
    "id": "m78137442349"
  },
  {
    "id": "m81169913799"
  },
  {
    "id": "m82435454961"
  },
  {
    "id": "m82819351440"
  },
  {
    "id": "m84327527898"
  },
  {
    "id": "m85137316109"
  },
  {
    "id": "m85933547827"
  },
  {
    "id": "m86103712019"
  },
  {
    "id": "m86397446074"
  },
  {
    "id": "m86463104742"
  },
  {
    "id": "m88237623604"
  },
  {
    "id": "m88386252832"
  },
  {
    "id": "m88859269460"
  },
  {
    "id": "m89983920835"
  },
  {
    "id": "m90331440116"
  },
  {
    "id": "m90819681390"
  },
  {
    "id": "m92144005948"
  },
  {
    "id": "m93647607225"
  },
  {
    "id": "m97241617875"
  },
  {
    "id": "m97653705201"
  },
  {
    "id": "m97799714299"
  },
  {
    "id": "m98688744749"
  }
]

// 检查目录是否存在
if (!fs.existsSync(DATA_DIR)) {
  // 目录不存在，创建目录
  fs.mkdirSync(DATA_DIR);
  console.log('目录已创建！');
} else {
  console.log('目录已存在！');
}


function getData(mid) {
  const options = {
    "method": "GET",
    "hostname": "api.mercari.jp",
    "port": null,
    // "path": "/items/get?id=m17987627229",
    "path": `/items/get?id=${mid}`,
    "headers": {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
      "dpop": "eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7ImNydiI6IlAtMjU2Iiwia3R5IjoiRUMiLCJ4IjoiM2lmcmo4S2NfUUVsU3FOVlRsRzZrY0NwNWRVS2xFWHRONzk3WGlYZEtQQSIsInkiOiJsVTJVMi1SLXFFdGI5SHhfLVItZUt4NTRWeC00R1J0VC1Pc2Jnd0FRck1vIn19.eyJpYXQiOjE2NzkwMzMzMjEsImp0aSI6IjQ5NWVhYjI4LWY4OGUtNGQzOC04Y2M2LWU5YzA1MjM3NjdkZCIsImh0dSI6Imh0dHBzOi8vYXBpLm1lcmNhcmkuanAvaXRlbXMvZ2V0IiwiaHRtIjoiR0VUIiwidXVpZCI6IjNmNzJkZjJhLTczYTYtNDI1Ny05YTQ1LThiYmExNjZmMTdhYSJ9.pKux4lhyzyJlfCaYIXUaGRjr06GhDdmpRIaf_qu6OmrDa6A3_-BAmOY22XljDFZSbUWMOcQpdlJQiNzjwCQPQg",
      "x-platform": "web"
    }
  };


  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {

      const body = Buffer.concat(chunks);
      const data = body.toString();

      const dataObj = JSON.parse(data)
      // console.log(dataObj)

      const { result } = dataObj
      if (result === 'OK') {
        // 请求成功
        const dataFileName = dataObj.data.id
        // 异步写文件
        fs.writeFile(`${DATA_DIR}/${dataFileName}.json`, data, (err) => {
          if (err) throw err;
          console.log(`${DATA_DIR}/${dataFileName}.json`);
        });
      } else {
        console.log('数据请求失败')
      }
    });
  });

  req.end();
}


mids.map(mid => {
  getData(mid.id)
})



