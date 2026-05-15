const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 

let blogPosts = [];
let nextId = 1; 

const timestamp = () => new Date().toISOString();



app.get("/posts", (req, res) => {
  res.status(200).json({
    success: true,
    count: blogPosts.length,
    data: blogPosts,
  });
});


app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: `Post with ID ${id} not found`,
    });
  }

  res.status(200).json({ success: true, data: post });
});


app.post("/posts", (req, res) => {
  const { title, author, content } = req.body;

 
  if (!title || !author || !content) {
    return res.status(400).json({
      success: false,
      message: "title, author, and content are required fields",
    });
  }

  const newPost = {
    id: nextId++,
    title,
    author,
    content,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  };

  blogPosts.push(newPost);

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: newPost,
  });
});


app.put("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = blogPosts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Post with ID ${id} not found`,
    });
  }

  
  const updatedPost = {
    ...blogPosts[index],
    ...req.body,
    id,                       
    updatedAt: timestamp(),
  };

  blogPosts[index] = updatedPost;

  res.status(200).json({
    success: true,
    message: "Post updated successfully",
    data: updatedPost,
  });
});


app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const exists = blogPosts.some((p) => p.id === id);

  if (!exists) {
    return res.status(404).json({
      success: false,
      message: `Post with ID ${id} not found`,
    });
  }

  blogPosts = blogPosts.filter((p) => p.id !== id);

  res.status(200).json({
    success: true,
    message: `Post with ID ${id} deleted successfully`,
  });
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});


app.listen(PORT, () => {
  console.log(`\n🚀  Data Hub server running at http://localhost:${PORT}`);
  console.log("──────────────────────────────────────────");
  console.log("  Available endpoints:");
  console.log("  GET    /posts");
  console.log("  GET    /posts/:id");
  console.log("  POST   /posts");
  console.log("  PUT    /posts/:id");
  console.log("  DELETE /posts/:id");
  console.log("──────────────────────────────────────────\n");
});
