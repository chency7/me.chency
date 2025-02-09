const net = require("net");
const port = 3000;

const server = net.createServer();

server.once("error", (err) => {
  if (err.code === "EADDRINUSE") {
    // 系统弹窗提示
    console.error(`端口 ${port} 已被占用！`);
    process.exit(1);
  }
});

server.once("listening", () => {
  server.close();
});

server.listen(port);
