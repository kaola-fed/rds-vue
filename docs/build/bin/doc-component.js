const path = require('path');
const https = require('https');
const fs = require('fs');

const staticHost = 'https://haitao.nos.netease.com/';
const components = [{
  name: 'header.vue',
  url: `${staticHost}e7738290-e7a2-4153-a1da-5090a7697e44.vue`
}, {
  name: 'theme-picker.vue',
  url: `${staticHost}870543e4-a693-4169-af38-0183a5b784e9.vue`
}, {
  name: 'footer-nav.vue',
  url: `${staticHost}f2c76d81-365f-4090-869e-2d6ce50100c0.vue`
}, {
  name: 'demo-block.vue',
  url: `${staticHost}d75cd2a6-88a5-443d-a82f-642f17cc6975.vue`
}, {
  name: 'side-nav.vue',
  url: `${staticHost}96f3a6fc-14de-4191-991b-740e97d2e33f.vue`
}, {
  name: 'search.vue',
  url: `${staticHost}b7757add-0480-4202-ab74-197ea0beb802.vue`
}, {
  name: 'footer.vue',
  url: `${staticHost}a3fcc6ef-fb5c-4a38-a5cf-6e90ca857635.vue`
}];

const destDir = path.resolve(__dirname, '../../examples/components/');
components.reduce((p, component) => {
  return new Promise((resolve) => {
    https.get(component.url, (response) => {
      let file = fs.createWriteStream(path.resolve(destDir, component.name));
      response.pipe(file);
      file.on('finish', () => {
        resolve(file.close());
      })
    });
  });
}, Promise.resolve());
