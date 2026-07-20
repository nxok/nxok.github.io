# VitePress

## **本地部署**

1. 安装 NVM (nvm-windows)
- 此工具用于安装和管理多个 Node.js 版本，使得在不同项目中使用不同版本的 Node.js 变得更加方便。
  - 下载并安装 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases/download/1.2.2/nvm-setup.zip)

  - 安装完成后，使用命令：
    ```bash
    # 查看 nvm 版本（输出如 1.2.2）则表示安装成功
    nvm -v
    ```

2. 安装 Node.js
- 此工具用于运行 VitePress 所需的 Node.js 环境，VitePress 基于 Node.js 构建。
  - 使用刚才安装好的 `nvm` 来安装指定版本的 Node.js。
    ```bash
    # 查看当前可安装的 Node.js 版本列表
    nvm list available

    # 安装指定的 Node.js 版本（如：nvm install 24.14.0）
    nvm install <version>

    # 切换并启用该版本
    nvm use <version>
    
    # 查看当前 Node.js 版本（如 v24.14.0）
    node -v
    ```

3. 安装并运行 VitePress 项目
- 安装好 Node.js 后，就可以使用 npm 和 npx 命令了。
  - 创建 VitePress 项目，[官网文档](https://vuejs.github.io/vitepress/v1/zh/guide/getting-started)。
    ```bash
    # 进入 website 项目下，执行安装 VitePress 命令
    npm add -D vitepress

    # 初始化项目
    npx vitepress init

    # 运行项目
    npm run docs:dev
    
    ```
## **排除目录**
.gitignore
```bash
# 依赖库
node_modules/

# VitePress 编译输出
.vitepress/dist
.vitepress/cache

# 操作系统临时文件
.DS_Store
Thumbs.db

# 日志文件
*.log
```



## **线上部署**

1. 创建 Github 仓库：[官方文档](https://docs.github.com/zh/pages/getting-started-with-github-pages/creating-a-github-pages-site)


2. 上传项目
```bash
echo "# nxok.github.io" >> README.md 
git init 

git add .

git commit -m "first commit" 
git branch -M main 
git remote add origin https://github.com/***/***.github.io.git
git push -u origin main
```

3. 创建工作流
 - 进入刚创建的仓库，找到 **Settings** （上方）-> **Pages** （左侧）-> **Source** （下拉菜单）-> **GitHub Actions**。
 - 创建一个新的工作流，将文件命名为 'deploy.yml' , 文件内容：[deploy.yml](https://vuejs.github.io/vitepress/v1/guide/deploy)。
 - 提交之前需要注意 deploy.yml 内容中的 "path: docs/.vitepress/dist" ，如果初始化时使用的根路径，这里需要修改为 "path: .vitepress/dist" 。
