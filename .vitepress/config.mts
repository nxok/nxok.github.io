import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 语言
  lang: "zh-CN",
  // 标签页名称
  title: "nxok",
  description: "知识库",
  // 标签页图标
  head: [["link", { rel: "icon", href: "/icon/logo.svg" }]],

  themeConfig: {
    // Logo 图标
    logo: "/icon/logo.svg",

    // 导航栏
    nav: [
      { text: "应用部署", link: "/deployment/index.md" },
      { text: "学习笔记", link: "/learning/index.md" },
    ],

    // 侧边栏
    sidebar: {
      "/network/": [
        {
          items: [
            { text: "Chrome", link: "/network/chrome/index.md" },
            { text: "Server", link: "/network/servers/index.md" },
          ],
        },
      ],

      "/deployment/": [
        {
          items: [
            { text: "VitePress", link: "/deployment/vitepress/index.md" },
            { text: "Driver", link: "/deployment/driver/index.md" },
            { text: "Router", link: "/deployment/router/index.md" },
          ],
        },
      ],

      "/learning/": [
        {
          text: "TCP·IP网络编程", collapsed: true, items: [
            {
              text: "第一部分", collapsed: true, items: [
                { text: "(01)理解网络编程和套接字", link: "/learning/《TCP·IP网络编程》/(1)第一部分/(01)理解网络编程和套接字/index.md" },
                { text: "(02)套接字类型与协议设置", link: "/learning/《TCP·IP网络编程》/(1)第一部分/(02)套接字类型与协议设置/index.md" },
              ],
            },
            { text: "第二部分", link: "/learning/《TCP·IP网络编程》/(2)第二部分/index.md" },
            { text: "第三部分", link: "/learning/《TCP·IP网络编程》/(3)第三部分/index.md" },
            { text: "第四部分", link: "/learning/《TCP·IP网络编程》/(4)第四部分/index.md" },
          ],
        },
        {
          text: "Python", collapsed: true, items: [
            { text: "01", link: "/learning/python/01/index.md" },
            { text: "02", link: "/learning/python/02/index.md" },
          ],
        },
        {
          text: "C#", collapsed: true, items: [
            { text: "01", link: "/learning/csharp/01/index.md" },
            { text: "02", link: "/learning/csharp/02/index.md" },
          ],
        },
      ],
    },

    // 社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    // 页脚
    footer: {
      copyright: "© 2026 nxok . All Rights Reserved.",
    },
  },
});
