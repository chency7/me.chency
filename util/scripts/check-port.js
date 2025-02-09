const net = require("net");
const notifier = require("node-notifier");
const path = require("path");
const port = 3000;

const server = net.createServer();

server.once("error", (err) => {
  if (err.code === "EADDRINUSE") {
    // 系统弹窗提示
    notifier.notify({
      title: "端口被占用",
      message: `端口 ${port} 已被占用！\n请释放端口或使用其他端口。`,
      icon: path.join(__dirname, "../public/favicon.ico"), // 可选：显示图标
      sound: true, // 播放提示音
      wait: true, // 等待用户操作
    });

    console.error(`端口 ${port} 已被占用！`);
    process.exit(1);
  }
});

server.once("listening", () => {
  server.close();
});

server.listen(port);
