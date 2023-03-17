import http from "node:https"

const options = {
  method: "GET",
  hostname: "127.0.0.1",
  port: 3001,
  path: "/items/get?id=m88479087694",
  headers: {
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
    dpop: "eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7ImNydiI6IlAtMjU2Iiwia3R5IjoiRUMiLCJ4IjoiM2lmcmo4S2NfUUVsU3FOVlRsRzZrY0NwNWRVS2xFWHRONzk3WGlYZEtQQSIsInkiOiJsVTJVMi1SLXFFdGI5SHhfLVItZUt4NTRWeC00R1J0VC1Pc2Jnd0FRck1vIn19.eyJpYXQiOjE2NzkwMzMzMjEsImp0aSI6IjQ5NWVhYjI4LWY4OGUtNGQzOC04Y2M2LWU5YzA1MjM3NjdkZCIsImh0dSI6Imh0dHBzOi8vYXBpLm1lcmNhcmkuanAvaXRlbXMvZ2V0IiwiaHRtIjoiR0VUIiwidXVpZCI6IjNmNzJkZjJhLTczYTYtNDI1Ny05YTQ1LThiYmExNjZmMTdhYSJ9.pKux4lhyzyJlfCaYIXUaGRjr06GhDdmpRIaf_qu6OmrDa6A3_-BAmOY22XljDFZSbUWMOcQpdlJQiNzjwCQPQg",
    "x-platform": "web",
  },
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
