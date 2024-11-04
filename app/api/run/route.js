import { NextResponse } from "next/server";
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer d134baea-2d94-4da1-9252-2644a9fb9fa2");
myHeaders.append("Cookie", "_SESSION=+YZAc3mx02Ce5ldhH+7JOVhT4n8+V+g9xxjl4kbHP7MxQBCjs4ZkUMWR9TaFjzQ3j9sykIUjTk2u9uwOlRDe81a5+c+aODRuekb69P3SsboLr2+N/CwUbX+foFM6QD2Kc1bhffz3tVIDQwReGdom3qhwaybiNB+7ldL5tJ5kkhvBLFQiRhU=");

var formats = {
  c:"c",
  python:"py",
  javascript:"js",
  go:"go"
}
async function runcode(lang, code, basename, stdin){
    console.log("test run 06",basename+"."+formats[lang]);
    var raw = JSON.stringify({
        "stdin": stdin,//"100\n 2\n 3\n"
        "files": [
          {
            "name": basename+"."+formats[lang],
            "content": code
          }
        ]
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
    var res = await fetch(`https://glot.io/api/run/${lang}/latest`, requestOptions)
    .then(response => response.text())
    .then(result => res=result)
    .catch(error => console.log('error', error));
    return res;
}





export async function POST(request){
    const data = await request.json();
    console.log("test data 07", data);
    var stdin_ = data["stdin"];
    console.log();
    var val = await runcode(data["language"], data["code"], data["basename"], stdin_);
    console.log("output",val);
    return NextResponse.json({res:val}, {})
}