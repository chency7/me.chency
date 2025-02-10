const fs = require("fs-extra");
const path = require("path");

async function copyAssets() {
  const source = path.join(process.cwd());
  const standalone = path.join(process.cwd(), ".next/standalone");

  try {
    // 复制 .next/static
    await fs.copy(path.join(source, ".next/static"), path.join(standalone, ".next/static"));

    // 复制 public 目录
    await fs.copy(path.join(source, "public"), path.join(standalone, "public"));

    // 复制字体文件
    await fs.copy(path.join(source, "app/fonts"), path.join(standalone, "app/fonts"));

    // 复制其他必要的静态资源
    const requiredFiles = [
      ".next/BUILD_ID",
      ".next/prerender-manifest.json",
      ".next/routes-manifest.json",
      ".next/required-server-files.json",
    ];

    for (const file of requiredFiles) {
      await fs.copy(path.join(source, file), path.join(standalone, file));
    }

    console.log("静态资源复制成功！");
  } catch (err) {
    console.error("复制失败:", err);
    process.exit(1);
  }
}

copyAssets();
