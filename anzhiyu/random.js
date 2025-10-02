var posts=["2025/10/02/Hexo-博客搭建全流程指南/","2025/10/02/Hello-World-0/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };