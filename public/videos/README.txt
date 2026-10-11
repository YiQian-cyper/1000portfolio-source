把三段作品视频放在这个文件夹里，文件名随意，例如：

  work-01.mp4
  work-02.mp4
  work-03.mp4

然后打开 src/components/Products.tsx，把 WORKS 数组里每一项的 video 改成：

  video: '/videos/work-01.mp4',

（放在 public/ 下的文件，引用时路径从 /videos/... 开始，不要写 public/）

建议规格：16:9 横屏、H.264 编码的 mp4、单个文件 5MB 以内，
无声循环播放效果最好（页面里的视频是静音自动循环的）。