import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ProseMirror Deep Leaning",
  description: "深入学习prosemirror",

  base: "/prosemirror-deep/",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "基础文档", link: "/document/" },
      { text: "API手册", link: "/api/" },
      {
        text: "深入学习",
        items: [
          {
            text: "L1-第一阶段",
            link: "/l1/",
          },
        ],
      },
      { text: "资源整理", link: "/awesome" },
    ],

    sidebar: {
      document: [
        {
          text: "Introduction",
          link: "/document/",
        },
        {
          text: "Documents",
          link: "/document/documents",
        },
        {
          text: "Schemas",
          link: "/document/schemas",
        },
        {
          text: "Document transformations",
          link: "/document/document-transformations",
        },
        {
          text: "The editor state",
          link: "/document/the-editor-state",
        },
        {
          text: "The view component",
          link: "/document/the-view-component",
        },
        {
          text: "commands",
          link: "/document/commands",
        },
        {
          text: "Collaborative editing",
          link: "/document/collaborative-editing",
        },
      ],
      api: [
        {
          text: "Reference manual",
          link: "/api/",
        },
        {
          text: "prosemirror-state",
          items: [
            {
              text: "Editor State",
              link: "/api/editor-state",
            },
            {
              text: "Selection",
              link: "/api/selection",
            },
          ],
        },
        { text: "prosemirror-view", items: [] },
      ],
      l1: [
        {
          text: "第一阶段",
          link: "/deep-leaning/l1/",
        },
        {
          text: "",
          link: "/deep-leaning/l1/",
        },
      ],
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/merlinpanda/prosemirror-deep",
      },
    ],
  },
});
