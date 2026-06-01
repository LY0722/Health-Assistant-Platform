// 创建缺失的图标目录结构
const fs = require('fs');
const path = require('path');

const tabsDir = path.join(__dirname, 'static', 'tabs');
if (!fs.existsSync(tabsDir)) {
  fs.mkdirSync(tabsDir, { recursive: true });
}

// 基础图标模板（占位用）
const baseIcon = Buffer.from(`
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="24" fill="$color"/>
</svg>
`.replace(/\n/g, ''), 'utf8');

// 创建默认图标
['service', 'health', 'store', 'user'].forEach(icon => {
  const normalPath = path.join(tabsDir, `${icon}.png`);
  const activePath = path.join(tabsDir, `${icon}_active.png`);
  
  if (!fs.existsSync(normalPath)) {
    fs.writeFileSync(normalPath, baseIcon);
  }
  
  if (!fs.existsSync(activePath)) {
    fs.writeFileSync(activePath, baseIcon.toString().replace('$color', '#007AFF'));
  }
});

console.log('✅ 已创建缺失的图标文件');