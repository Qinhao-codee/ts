import * as http from "http";
const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  // 设置返回json的头部
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  // GET 请求
  if (req.method === "GET") {
    if (req.url === "/hello") {
      return res.end(JSON.stringify({ msg: "hello GET", time: new Date() }));
    }
    return res.end(JSON.stringify({ code: 404, msg: "GET接口不存在" }));
  }
  // POST 请求
  if (req.method === "POST") {
    // 接收post body数据
    let bodyBuf = "";
    req.on("data", chunk => {
      bodyBuf += chunk.toString();
    });
    req.on("end", () => {
      try {
        const payload = JSON.parse(bodyBuf);
        const ret = {
          code: 200,
          msg: "收到POST数据",
          data: payload
        };
        res.end(JSON.stringify(ret));
      } catch (err) {
        res.end(JSON.stringify({ code: 400, msg: "JSON解析失败" }));
      }
    });
    return;
  }
  // 其他请求方法
  res.end(JSON.stringify({ code: 405, msg: "不支持该请求方法" }));
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ 服务启动成功，监听端口:${PORT}`);
  console.log(`GET访问: http://localhost:${PORT}/hello`);
  console.log(`POST访问: http://localhost:${PORT}`);
});
// 捕获进程退出信号，优雅关闭
process.on("SIGINT", () => {
  console.log("\n🛑 收到退出信号，关闭服务");
  server.close(() => {
    process.exit(0);
  });
});
