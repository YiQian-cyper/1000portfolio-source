# Game Design Portfolio - 单页作品集网站

面向欧洲游戏设计院校招生官的单页作品集网站：深色电影感视频背景 + 画布像素光圈开场 + 滚动衔接动画 + Bento 网格作品区。

技术栈：Vite + React 18 + TypeScript + Tailwind CSS v3 + lucide-react

## 怎么打开

**方式一：单文件版（最简单，推荐先用这个看效果）**

双击 `outputs\Game-Design-Portfolio.html`（就在上层 outputs 文件夹里）。
这是一个把 JS/CSS 全部内联进去的独立网页，双击即在浏览器打开，也可以单独发给别人、放到任何静态空间。
（字体、首屏背景视频、关于区的花朵视频走网络外链；三个作品视频都在本地 `public/videos/`。）

**方式二：项目开发模式（要改内容时用这个）**

双击项目里的 `start.bat`，会自动启动并打开浏览器；或者在此文件夹执行：

```bash
npm run dev           # 开发预览（自动热更新）
npm run build         # 生产构建到 dist/
npm run preview       # 预览构建结果
npm run build:single  # 重新生成单文件版
```

> 注意：不要直接双击项目根目录的 `index.html`。那是开发入口，必须经 Vite 服务器才能运行，双击只会白屏。要看单文件请用方式一。

## 页面结构

| 区块 | 文件 | 说明 |
| --- | --- | --- |
| 开场动画 | `src/components/SplashScreen.tsx` | Canvas 像素光圈展开，1.8 秒后淡出 |
| 顶部导航 | `src/components/Navbar.tsx` | 悬浮胶囊导航、自动隐藏/回落、滚动高亮当前区块、点 logo 回首页（顶部）、移动端全屏菜单 |
| 首屏 | `src/components/Hero.tsx` | 视频背景 + 点阵大标题 "PLAY. BREAK. REBUILD." |
| 关于 | `src/components/About.tsx` | 浅色圆角面板，像素溶解上边缘，滚入时逐条浮现 |
| 作品 | `src/components/Products.tsx` | 三张作品卡，每张一个视频展示位 + 编号 + 标题 + 简介 + 项目按钮 |
| 流程与联系 | `src/components/Footer.tsx` | 四步工作流程 + 联系方式 |

## 滚动动画逻辑

网站的核心观感来自一套「顺着滚动方向走」的动画系统，`src/hooks/useScrollProgress.ts` 和
`src/hooks/useReveal.ts` 负责驱动：

1. **首屏 → 关于 的交叉淡出**
   滚动时 `--p`（0→1）被写到根节点上，首屏内容一边上移、缩小、模糊，一边整体压黑；
   等首屏完全变黑之后，"关于" 面板才从下方升起，顶部边缘用三层像素遮罩一点点「溶解」出来。
   这一段不论往下滚还是往上滚都会完整回放。

2. **双向回放（往上滚也有动画）**
   `useReveal` 会在区块完全离开视口时重新「上膛」，所以从页底往回滚时，每个区块会重播入场动画；
   而且方向跟着你的滚动方向走：往下滚是从下方 `fade-up` 上来，往上滚则是从上方 `fade-down` 落下来。

3. **导航栏自动隐藏 / 回落**
   向下滚动时导航条向上收起，往上滚动（或回到页面顶部附近）时重新落下；
   点击导航后会有 1.4 秒的锁定，避免平滑滚动过程中导航条半路消失。
   当前所在区块会自动高亮，滚到页面底部时固定高亮 Contact。

4. **点 logo 回首页**
   左上角 logo 是「首页」，点击后平滑滚回最顶端的首屏（不是跳到"关于"）；
   滚动过程中导航条会一直留在屏幕上，并且高亮会随着经过的区块依次往回退，最后在首屏上不亮任何一项
   （首屏不属于导航里的四个区块，所以那里没有任何一项是"当前区块"）。

## 已填入的个人信息

- **姓名**：Pan Bokun —— 出现在 `src/components/About.tsx` 的标题、页脚版权行、以及 `index.html` 的浏览器标签标题。
- **邮箱**：bp1911600024@outlook.com —— 页脚联系方式按钮，点击直接唤起邮件客户端。
- **itch.io**：https://yiqianthousands.itch.io —— 页脚联系方式按钮，新标签页打开（公开主页，无需登录即可访问）。

## 作品区怎么放你自己的视频

作品区已经留好**三个视频展示位**，结构是：视频 → 编号 → 分类 → 标题 → 简介 → View project 按钮。
三张卡片的全部内容都写在 `src/components/Products.tsx` 顶部的 `WORKS` 数组里，改数组就够了：

```ts
const WORKS = [
  {
    id: '01',
    tag: 'Zombie FPS',                         // 卡片右上角的分类标签
    title: 'The Last Day',                     // 作品名
    body: '一句话简介……',
    video: 'https://…/sample.mp4',             // ← 换成你的视频
    href: 'https://yiqianthousands.itch.io',   // ← 换成该作品自己的页面
  },
  // …
]
```

**作品区现在的三张卡（文案在 `WORKS` 里）：**

| 编号 | 分类标签 | 作品 | 视频文件 |
| --- | --- | --- | --- |
| 01 | Zombie FPS | The Last Day（丧尸题材 FPS） | `the-last-day.mp4` |
| 02 | Horror RPG | Formula of the Fading Honeymoon（惊悚解密 RPG） | `formula-of-the-fading-honeymoon.mp4` |
| 03 | Digital Exhibition | Shan Hai Jing: Symbiosis Era（数字山海经展厅） | `shan-hai-jing.mp4` |

**换成你自己的视频：**

1. 把视频文件放到 `public/videos/` 里（这个文件夹已经建好，里面有说明）。
2. 把 `video` 字段改成 `videos/你的文件名.mp4`（**相对路径，开头没有斜杠**）——这样单文件版导出后也能找到视频；不要写 `public/`，也不要写成 `/videos/...`。
3. 建议规格：H.264 编码的 mp4、单文件 20MB 以内（越接近 16:9 越贴合卡片形状）；页面里的视频是**静音自动循环**播放的，所以做成无声循环效果最好。
   - 卡片里的视频用「完整显示」的方式铺满，所以**不是 16:9 的作品（例如像素风的竖构图）会完整显示、两侧留黑边，不会被裁掉**——字幕、立绘都在。

> 现在三个格子放的都是你自己的作品片段，都在 `public/videos/` 里：《The Last Day》（`the-last-day.mp4`）、《Formula of the Fading Honeymoon》（`formula-of-the-fading-honeymoon.mp4`）、《山海经·共生纪元》（`shan-hai-jing.mp4`）。
> 如果 `video` 指向的文件不存在或加载失败，卡片会自动显示一个写着编号和 "Video slot" 的占位块，不会出现空白或者坏图。

**其余还可以替换的内容：**

1. **流程文案**：`src/components/Footer.tsx` 的 `PROCESS_STEPS`。
2. **关于区的配图视频**：`src/components/About.tsx` 里那个花朵视频。

改完内容后执行 `npm run build:single` 重新生成单文件版（再把 `dist-single/Game-Design-Portfolio.html` 复制到 `outputs/`）。

## 点开作品视频（灯箱播放）

点作品卡里的视频，会在屏幕**正中央**弹出播放器，周围界面自动**模糊**（聚光灯效果），视频**右上角**有一个关闭（✕）按钮和一个静音 / 取消静音按钮：

- 打开、关闭用同一套「淡入淡出 + 轻微缩放」动画，关闭时**反向播放**；
- 关闭后页面会**回到你点开视频时的那个位置**，不会跳走——灯箱打开期间页面被冻结，关闭的一瞬间精确归位，所以看上去是「原路返回」，动画也在；
- 按 `Esc` 或点击视频以外的模糊区域也能关闭。

实现在 `src/components/VideoLightbox.tsx`，由 `src/components/Products.tsx` 调用。作品卡里的视频是**静音自动循环**的预览；点开后的灯箱默认也是静音，可以手动开声音。

## 设计规范

- 主色：页面黑 `#000`、强调橙 `#F64302`
- 浅色区：关于 `#f0eded`、作品区 `#E8E5E9`、卡片 `#EBE8EB`
- 字体：`BubbledotICG-FinePos`（点阵标题，**已自托管**，文件在 `src/assets/fonts/`）、`JetBrains Mono`（正文，Google Fonts 外链）
- 动画统一缓动：`cubic-bezier(0.16, 1, 0.3, 1)`

## 备注

- 正文字体（JetBrains Mono）、首屏背景视频、关于区花朵视频仍走外链；点阵标题字体和三个作品视频都在本地。
- 导航栏初始为白色，滚过一屏后自动转为黑色，以适应下半部分的浅色区块。
- 若浏览器开启了「减少动态效果」（prefers-reduced-motion），建议在正式投递前手动确认一次过渡观感。