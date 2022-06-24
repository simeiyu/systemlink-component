### 关于package.json
#### name
node_systemlink_front
#### version
每次执行 node run docker 前，请手动更新 version
#### scripts
```jsx
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview",
    "docker": "vite build && node docker/build.js",
    "start": "node server.ts DataConnector DataBase"
},
```

- dev：本地开发——前端
- build：前端构建dist目录
- serve：略
- docker：打包docker镜像，执行前请修改version
- start：启动server，带两个参数。这两个参数会从/spContext/get 接口发送给前端。
   - 第一个参数：组件的名称。如"DataConnector" 为数据连接器组件，在App.vue中有引用。用于加载前端的预制组件。
   - 第二个参数：组件的类型，如“DataBase”。作为前端请求api时的 componentType 参数。

### 组件的镜像设置
在算盘的组件或节点中，设置镜像（Image）为 [name]:[version]<br />例如：node_systemlink_front:0.0.1
### 组件的启动命令
| 组件 | 启动命令 | 备注 |
| --- | --- | --- |
| DataBase | node server.ts DataConnector DataBase |  |
| MQTT | node server.ts DataConnector MQTT |  |
| Kafka | node server.ts DataConnector Kafka |  |
| 可编程集成组件 | node server.ts Intergration string | 该组件不需要componentType，所以启动命令的第二个参数可以为任意字符串 |

