import express from "express";
const app = express();
const port = 3001;

app.use(express.json()); // 解析post json

app.get("/hello", (req, res) => {
  res.json({msg:"hello get 11", time:new Date()});
});

app.post("/api", (req, res) => {
  res.json({msg:"收到post", data:req.body});
});

app.listen(port, ()=>{
  console.log(`express服务启动：http://localhost:${port}`);
})
