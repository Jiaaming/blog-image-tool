'use strict';
const english={
  "博客拼图工具": "Blog Collage",
  "● 图片仅在本机处理": "● Photos stay on your device",
  "↶ 撤销": "↶ Undo",
  "保存工程": "Save project",
  "打开工程": "Open project",
  "导出图片 ↗": "Export image ↗",
  "照片素材": "Photos",
  "添加你的照片": "Add photos",
  "点击选择，或拖入多张图片": "Choose files or drop photos here",
  "点击照片填入选中格子，也可拖到画布。支持 JPG、PNG、WebP。": "Click a photo to fill the selected cell, or drag it onto the canvas. JPG, PNG and WebP supported.",
  "导入照片，调整布局，": "Add photos, arrange them,",
  "导出适合博客的拼图。": "and export a collage for your blog.",
  "添加示例照片 ↗": "Add sample photos ↗",
  "编辑拼图": "Edit collage",
  "拖动照片调整位置 · 滚轮缩放 · 点击格子编辑": "Drag to crop · Scroll to zoom · Click a cell to edit",
  "自动填入照片": "Auto-fill photos",
  "从一个布局开始": "Choose a layout",
  "保留已导入的素材": "Imported photos are kept",
  "画布设置": "Canvas",
  "整体比例": "Aspect ratio",
  "3 : 2 · 博客推荐": "3 : 2 · Blog",
  "16 : 9 · 横向宽幅": "16 : 9 · Wide",
  "4 : 3 · 经典": "4 : 3 · Classic",
  "1 : 1 · 方形": "1 : 1 · Square",
  "3 : 4 · 竖向": "3 : 4 · Portrait",
  "自定义": "Custom",
  "宽度 px": "Width (px)",
  "高度 px": "Height (px)",
  "图片间距": "Gap",
  "外边距": "Padding",
  "背景颜色": "Background",
  "行布局": "Rows",
  "＋ 添加行": "＋ Add row",
  "照片调整": "Photo",
  "格子宽度占比": "Relative cell width",
  "照片缩放": "Zoom",
  "重置位置": "Reset position",
  "移除照片": "Remove photo",
  "格子比例由画布、行高和宽度占比共同决定。相邻照片会自动重新排版。": "Cell shape depends on the canvas, row height and relative width. Neighboring cells adjust automatically.",
  "导出设置": "Export",
  "文件格式": "Format",
  "JPG · 适合博客，文件更小": "JPG · Smaller files",
  "PNG · 无损高清": "PNG · Lossless",
  "WebP · 轻巧清晰": "WebP · Compact",
  "文件名称": "File name",
  "按画布的实际像素导出，不受预览大小影响。": "Exports at the canvas resolution, regardless of preview size.",
  "撤销 Ctrl / ⌘ Z": "Undo Ctrl / ⌘ Z",
  "重做": "Redo",
  "放入照片": "Add photo",
  "示例照片已添加": "Sample photos added",
  "正在添加示例…": "Adding samples…",
  "已删除照片，可撤销恢复": "Photo deleted. Undo to restore.",
  "删除照片": "Delete photo",
  "先添加一些照片吧": "Add some photos first.",
  "两张并排": "Side by side",
  "经典四宫格": "Four photos",
  "年度故事": "Two + three",
  "一大两小": "One + two",
  "九个瞬间": "Nine photos",
  "添加照片后就可以导出了": "Add photos before exporting.",
  "导出失败，请减小画布尺寸": "Export failed. Try a smaller canvas.",
  "博客拼图": "blog-collage",
  "博客拼图工程.json": "blog-collage-project.json",
  "工程已保存，包含照片和裁切位置": "Project saved with photos and crop positions.",
  "已恢复工程": "Project restored.",
  "工程文件无法读取，请选择有效的拼图工程": "Could not open this file. Choose a valid collage project.",
  "已添加示例插画，可以试试拖动和缩放": "Sample photos added. Try dragging and zooming.",
  "示例照片添加失败，请重试": "Could not add sample photos. Please try again.",
  "山野": "Mountains",
  "日落": "Sunset",
  "海边": "Coast",
  "散步": "Walk",
  "远行": "Journey",
  "cell": "Row {row}, photo {photo}",
  "selected": "Row {row} · Photo {photo}",
  "row": "Row {row}",
  "rowCount": "Photos in row {row}",
  "rowHeight": "Relative height of row {row}",
  "deleteRow": "Delete row {row}",
  "rowUnits": "Height",
  "count": "{n} photos",
  "weight": "{n} parts",
  "imported": "Added {n} photos",
  "failedFiles": " · {n} files could not be read",
  "exported": "Exported {width} × {height} image"
};
const chinese={
  "cell": "第 {row} 行第 {photo} 张照片",
  "selected": "第 {row} 行 · 第 {photo} 张",
  "row": "第 {row} 行",
  "rowCount": "第 {row} 行照片数",
  "rowHeight": "第 {row} 行高度占比",
  "deleteRow": "删除第 {row} 行",
  "rowUnits": "张 · 行高",
  "count": "{n} 张",
  "weight": "{n} 份",
  "imported": "已添加 {n} 张照片",
  "failedFiles": "，{n} 个文件无法读取",
  "exported": "已导出 {width} × {height} 图片"
};

let language='zh';
try { const saved=localStorage.getItem('blog-collage-language'); if(saved==='en'||saved==='zh')language=saved; } catch {}
function t(key,vars={}) {
  let value=language==='en'?(english[key]??key):(chinese[key]??key);
  return value.replace(/\{(\w+)\}/g,(_,name)=>vars[name]??'');
}
// Keep references to static text nodes so translating labels never replaces controls.
const staticText=[];
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
while(walker.nextNode()) {
  const node=walker.currentNode,key=node.textContent.trim();
  if(english[key])staticText.push({node,key});
}
const staticTitles=[...document.querySelectorAll('[title]')].map(node=>({node,key:node.title}));
function applyLanguage(){
  document.documentElement.lang=language==='en'?'en':'zh-CN';
  document.title=t('博客拼图工具');
  staticText.forEach(({node,key})=>{if(node.isConnected)node.textContent=t(key)});
  staticTitles.forEach(({node,key})=>node.title=t(key));
  const button=document.getElementById('language');
  button.textContent=language==='en'?'中文':'English';
  button.setAttribute('aria-label',language==='en'?'切换到中文':'Switch to English');
  const filename=document.getElementById('filename');
  if(['博客拼图','blog-collage'].includes(filename.value))filename.value=t('博客拼图');
}
applyLanguage();
