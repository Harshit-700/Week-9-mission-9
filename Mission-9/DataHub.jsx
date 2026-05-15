import { useState, useEffect, useRef } from "react";

const INITIAL_POSTS = [];

const TAG_COLORS = ["#00FFB2", "#FF6B6B", "#FFD93D", "#6BCBFF", "#FF9EFF"];

function getTagColor(id) {
  return TAG_COLORS[(id - 1) % TAG_COLORS.length];
}

function Toast({ msg, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      position: "fixed", bottom: 32, right: 32, zIndex: 999,
      background: type === "error" ? "#FF6B6B" : "#00FFB2",
      color: "#0A0A0A", fontFamily: "'DM Mono', monospace",
      fontWeight: 700, fontSize: 13, padding: "12px 22px",
      borderRadius: 4, boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
      animation: "slideUp 0.3s ease",
      letterSpacing: 1,
    }}>{msg}</div>
  );
}

function MethodBadge({ method }) {
  const colors = {
    GET: "#6BCBFF", POST: "#00FFB2", PUT: "#FFD93D",
    DELETE: "#FF6B6B", PATCH: "#FF9EFF"
  };
  return (
    <span style={{
      fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 700,
      color: colors[method] || "#fff", background: "rgba(255,255,255,0.07)",
      padding: "2px 9px", borderRadius: 3, border: `1px solid ${colors[method]}33`,
      letterSpacing: 1,
    }}>{method}</span>
  );
}

function StatusBadge({ code }) {
  const color = code < 300 ? "#00FFB2" : code < 400 ? "#FFD93D" : "#FF6B6B";
  return (
    <span style={{
      fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700,
      color, letterSpacing: 1,
    }}>{code}</span>
  );
}

function LogEntry({ entry }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      padding: "8px 0", cursor: "pointer",
    }} onClick={() => setOpen(o => !o)}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{ color: "#555", fontFamily: "'DM Mono',monospace", fontSize: 11 }}>
          {entry.time}
        </span>
        <MethodBadge method={entry.method} />
        <span style={{ color: "#ccc", fontFamily: "'DM Mono',monospace", fontSize: 12 }}>
          {entry.route}
        </span>
        <StatusBadge code={entry.status} />
        <span style={{ marginLeft: "auto", color: "#444", fontSize: 12 }}>
          {open ? "▲" : "▼"}
        </span>
      </div>
      {open && (
        <pre style={{
          margin: "8px 0 0", padding: 12,
          background: "rgba(255,255,255,0.03)", borderRadius: 6,
          fontFamily: "'DM Mono',monospace", fontSize: 11,
          color: "#00FFB2", overflowX: "auto",
          border: "1px solid rgba(0,255,178,0.1)",
        }}>{JSON.stringify(entry.payload, null, 2)}</pre>
      )}
    </div>
  );
}

function PostCard({ post, onDelete, onEdit }) {
  const [hover, setHover] = useState(false);
  const color = getTagColor(post.id);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hover ? color + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 10, padding: "20px 22px",
        transition: "all 0.2s ease",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, width: 3,
        height: "100%", background: color, borderRadius: "10px 0 0 10px",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{
              fontFamily: "'DM Mono',monospace", fontSize: 11,
              color, opacity: 0.8, letterSpacing: 1,
            }}>#{String(post.id).padStart(3, "0")}</span>
            <h3 style={{
              margin: 0, fontSize: 15, fontWeight: 700,
              fontFamily: "'Syne', sans-serif", color: "#F0F0F0",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{post.title}</h3>
          </div>
          <p style={{
            margin: "0 0 10px", fontSize: 13, color: "#888",
            fontFamily: "'DM Mono',monospace", letterSpacing: 0.3,
          }}>by <span style={{ color: "#bbb" }}>{post.author}</span></p>
          <p style={{
            margin: 0, fontSize: 13, color: "#777", lineHeight: 1.6,
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>{post.content}</p>
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <button onClick={() => onEdit(post)} style={{
            background: "rgba(255,217,61,0.1)", border: "1px solid rgba(255,217,61,0.2)",
            color: "#FFD93D", borderRadius: 6, padding: "6px 12px",
            fontFamily: "'DM Mono',monospace", fontSize: 11, cursor: "pointer",
            fontWeight: 700, letterSpacing: 1, transition: "all 0.15s",
          }}>EDIT</button>
          <button onClick={() => onDelete(post.id)} style={{
            background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.2)",
            color: "#FF6B6B", borderRadius: 6, padding: "6px 12px",
            fontFamily: "'DM Mono',monospace", fontSize: 11, cursor: "pointer",
            fontWeight: 700, letterSpacing: 1, transition: "all 0.15s",
          }}>DEL</button>
        </div>
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        {post.createdAt && (
          <span style={{
            fontSize: 10, color: "#444", fontFamily: "'DM Mono',monospace",
            letterSpacing: 0.5,
          }}>created {new Date(post.createdAt).toLocaleString()}</span>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [logs, setLogs] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [form, setForm] = useState({ title: "", author: "", content: "" });
  const [editPost, setEditPost] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const [reqPanel, setReqPanel] = useState({ method: "GET", route: "/posts", body: "" });
  const [liveRes, setLiveRes] = useState(null);
  const idRef = useRef(1);

  const ts = () => new Date().toISOString();
  const timeStr = () => new Date().toLocaleTimeString();

  const addLog = (method, route, status, payload) => {
    setLogs(l => [{ method, route, status, payload, time: timeStr() }, ...l].slice(0, 50));
  };

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const getAllPosts = () => {
    const res = { success: true, count: posts.length, data: posts };
    addLog("GET", "/posts", 200, res);
    return res;
  };

  const getPostById = (id) => {
    const post = posts.find(p => p.id === id);
    if (!post) { addLog("GET", `/posts/${id}`, 404, { success: false, message: `Post ${id} not found` }); return null; }
    addLog("GET", `/posts/${id}`, 200, { success: true, data: post });
    return post;
  };

  const createPost = (data) => {
    const { title, author, content } = data;
    if (!title || !author || !content) {
      addLog("POST", "/posts", 400, { success: false, message: "title, author, content required" });
      showToast("Missing required fields", "error"); return false;
    }
    const post = { id: idRef.current++, title, author, content, createdAt: ts(), updatedAt: ts() };
    setPosts(p => [...p, post]);
    setNextId(idRef.current);
    addLog("POST", "/posts", 201, { success: true, data: post });
    showToast("Post created ✓");
    return true;
  };

  const updatePost = (id, data) => {
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) { addLog("PUT", `/posts/${id}`, 404, { success: false, message: "Not found" }); showToast("Post not found", "error"); return false; }
    const updated = { ...posts[idx], ...data, id, updatedAt: ts() };
    setPosts(p => p.map(post => post.id === id ? updated : post));
    addLog("PUT", `/posts/${id}`, 200, { success: true, data: updated });
    showToast("Post updated ✓");
    return true;
  };

  const deletePost = (id) => {
    const exists = posts.some(p => p.id === id);
    if (!exists) { addLog("DELETE", `/posts/${id}`, 404, { success: false, message: "Not found" }); showToast("Post not found", "error"); return; }
    setPosts(p => p.filter(post => post.id !== id));
    addLog("DELETE", `/posts/${id}`, 200, { success: true, message: `Post ${id} deleted` });
    showToast("Post deleted");
  };

  const handleFormSubmit = () => {
    if (editPost) {
      if (updatePost(editPost.id, form)) { setEditPost(null); setForm({ title: "", author: "", content: "" }); }
    } else {
      if (createPost(form)) setForm({ title: "", author: "", content: "" });
    }
  };

  const handleEdit = (post) => {
    setEditPost(post);
    setForm({ title: post.title, author: post.author, content: post.content });
    setActiveTab("create");
  };

  // Live API Tester
  const runRequest = () => {
    const { method, route, body } = reqPanel;
    const idMatch = route.match(/\/posts\/(\d+)/);
    const id = idMatch ? parseInt(idMatch[1]) : null;
    let res;
    try {
      if (method === "GET" && !id) res = getAllPosts();
      else if (method === "GET" && id) res = getPostById(id) || { success: false, message: "Not found" };
      else if (method === "POST") {
        const parsed = JSON.parse(body || "{}");
        const ok = createPost(parsed);
        res = ok ? { success: true, message: "Created" } : { success: false, message: "Validation failed" };
      }
      else if (method === "PUT" && id) {
        const parsed = JSON.parse(body || "{}");
        const ok = updatePost(id, parsed);
        res = ok ? { success: true, message: "Updated" } : { success: false, message: "Not found" };
      }
      else if (method === "DELETE" && id) { deletePost(id); res = { success: true, message: "Deleted" }; }
      else res = { success: false, message: "Invalid route" };
    } catch (e) { res = { success: false, message: "Invalid JSON body" }; }
    setLiveRes(res);
  };

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchQ.toLowerCase()) ||
    p.author.toLowerCase().includes(searchQ.toLowerCase())
  );

  const tabs = ["dashboard", "posts", "create", "tester", "logs"];
  const statCards = [
    { label: "Total Posts", value: posts.length, color: "#00FFB2", icon: "◈" },
    { label: "API Calls", value: logs.length, color: "#6BCBFF", icon: "⬡" },
    { label: "Errors", value: logs.filter(l => l.status >= 400).length, color: "#FF6B6B", icon: "⚠" },
    { label: "Success Rate", value: logs.length ? Math.round(logs.filter(l => l.status < 400).length / logs.length * 100) + "%" : "—", color: "#FFD93D", icon: "✦" },
  ];

  const tabStyle = (t) => ({
    background: activeTab === t ? "rgba(0,255,178,0.12)" : "transparent",
    border: `1px solid ${activeTab === t ? "rgba(0,255,178,0.35)" : "rgba(255,255,255,0.07)"}`,
    color: activeTab === t ? "#00FFB2" : "#666",
    padding: "7px 18px", borderRadius: 6,
    fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 700,
    cursor: "pointer", letterSpacing: 1, transition: "all 0.15s",
    textTransform: "uppercase",
  });

  const inputStyle = {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8, padding: "11px 14px", color: "#F0F0F0",
    fontFamily: "'DM Mono',monospace", fontSize: 13, outline: "none",
    width: "100%", boxSizing: "border-box", transition: "border 0.15s",
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0A0A0A",
      fontFamily: "'Syne', sans-serif", color: "#F0F0F0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
        @keyframes slideUp { from { transform: translateY(16px); opacity:0; } to { transform: translateY(0); opacity:1; } }
        @keyframes fadeIn { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: none; } }
        .card-in { animation: fadeIn 0.35s ease both; }
        input:focus, textarea:focus, select:focus { border-color: rgba(0,255,178,0.4) !important; }
        button:hover { opacity: 0.85; }
      `}</style>

      
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 32px", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 60, position: "sticky", top: 0,
        background: "rgba(10,10,10,0.95)", backdropFilter: "blur(16px)", zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #00FFB2, #6BCBFF)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 900, color: "#0A0A0A",
          }}>⬡</div>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: -0.5 }}>
            Data<span style={{ color: "#00FFB2" }}>Hub</span>
          </span>
          <span style={{
            fontFamily: "'DM Mono',monospace", fontSize: 10,
            color: "#444", letterSpacing: 2, paddingLeft: 4,
          }}>RESTful API Simulator</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%", background: "#00FFB2",
            boxShadow: "0 0 8px #00FFB2",
          }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#00FFB2" }}>
            PORT 5000 · LIVE
          </span>
        </div>
      </div>

     
      <div style={{
        padding: "16px 32px", display: "flex", gap: 8, flexWrap: "wrap",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        {tabs.map(t => (
          <button key={t} style={tabStyle(t)} onClick={() => setActiveTab(t)}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>

       
        {activeTab === "dashboard" && (
          <div className="card-in">
            <h2 style={{ margin: "0 0 24px", fontWeight: 800, fontSize: 24, letterSpacing: -0.5 }}>
              API Overview
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 32 }}>
              {statCards.map((s, i) => (
                <div key={i} style={{
                  background: `${s.color}08`, border: `1px solid ${s.color}22`,
                  borderRadius: 12, padding: "22px 22px 18px",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", top: 16, right: 18,
                    fontSize: 22, color: s.color, opacity: 0.25,
                  }}>{s.icon}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#555", letterSpacing: 1, marginBottom: 10 }}>
                    {s.label.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 36, fontWeight: 800, color: s.color, lineHeight: 1 }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            
            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 14, color: "#888" }}>
              Endpoint Reference
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { m: "GET", r: "/posts", d: "Retrieve all blog posts" },
                { m: "GET", r: "/posts/:id", d: "Retrieve a single post by ID" },
                { m: "POST", r: "/posts", d: "Create a new blog post" },
                { m: "PUT", r: "/posts/:id", d: "Update a post by ID" },
                { m: "DELETE", r: "/posts/:id", d: "Delete a post by ID" },
              ].map((e, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  background: "rgba(255,255,255,0.025)", borderRadius: 8,
                  padding: "12px 18px", border: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <MethodBadge method={e.m} />
                  <code style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#ccc", flex: "0 0 180px" }}>{e.r}</code>
                  <span style={{ color: "#666", fontSize: 13 }}>{e.d}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        
        {activeTab === "posts" && (
          <div className="card-in">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontWeight: 800, fontSize: 22 }}>
                Blog Posts <span style={{ color: "#444", fontSize: 16 }}>({filteredPosts.length})</span>
              </h2>
              <input
                placeholder="Search posts..."
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                style={{ ...inputStyle, width: 220, fontSize: 12 }}
              />
            </div>
            {filteredPosts.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "60px 0",
                color: "#333", fontFamily: "'DM Mono',monospace", fontSize: 13,
              }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>◈</div>
                No posts yet. Use the Create tab to add one.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filteredPosts.map(p => (
                  <PostCard key={p.id} post={p} onDelete={deletePost} onEdit={handleEdit} />
                ))}
              </div>
            )}
          </div>
        )}

       
        {activeTab === "create" && (
          <div className="card-in" style={{ maxWidth: 600 }}>
            <h2 style={{ margin: "0 0 24px", fontWeight: 800, fontSize: 22 }}>
              {editPost ? `Edit Post #${String(editPost.id).padStart(3, "0")}` : "Create New Post"}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#555", letterSpacing: 1, display: "block", marginBottom: 6 }}>TITLE *</label>
                <input style={inputStyle} placeholder="Enter post title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#555", letterSpacing: 1, display: "block", marginBottom: 6 }}>AUTHOR *</label>
                <input style={inputStyle} placeholder="Author name" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#555", letterSpacing: 1, display: "block", marginBottom: 6 }}>CONTENT *</label>
                <textarea style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} placeholder="Write post content..." value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={handleFormSubmit} style={{
                  background: editPost ? "rgba(255,217,61,0.15)" : "rgba(0,255,178,0.15)",
                  border: `1px solid ${editPost ? "rgba(255,217,61,0.4)" : "rgba(0,255,178,0.4)"}`,
                  color: editPost ? "#FFD93D" : "#00FFB2",
                  padding: "11px 28px", borderRadius: 8,
                  fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 700,
                  cursor: "pointer", letterSpacing: 1,
                }}>{editPost ? "UPDATE POST" : "CREATE POST"}</button>
                {editPost && (
                  <button onClick={() => { setEditPost(null); setForm({ title: "", author: "", content: "" }); }} style={{
                    background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#555", padding: "11px 20px", borderRadius: 8,
                    fontFamily: "'DM Mono',monospace", fontSize: 12, cursor: "pointer", letterSpacing: 1,
                  }}>CANCEL</button>
                )}
              </div>
            </div>
          </div>
        )}

      
        {activeTab === "tester" && (
          <div className="card-in">
            <h2 style={{ margin: "0 0 20px", fontWeight: 800, fontSize: 22 }}>Live API Tester</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#555", letterSpacing: 1, display: "block", marginBottom: 6 }}>METHOD</label>
                  <select value={reqPanel.method} onChange={e => setReqPanel(r => ({ ...r, method: e.target.value }))}
                    style={{ ...inputStyle, cursor: "pointer" }}>
                    {["GET", "POST", "PUT", "DELETE"].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#555", letterSpacing: 1, display: "block", marginBottom: 6 }}>ROUTE</label>
                  <input style={inputStyle} value={reqPanel.route} onChange={e => setReqPanel(r => ({ ...r, route: e.target.value }))} placeholder="/posts or /posts/:id" />
                </div>
                <div>
                  <label style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#555", letterSpacing: 1, display: "block", marginBottom: 6 }}>REQUEST BODY (JSON)</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 140, resize: "vertical", fontSize: 12 }}
                    placeholder={'{\n  "title": "My Post",\n  "author": "Dev",\n  "content": "Hello world"\n}'}
                    value={reqPanel.body}
                    onChange={e => setReqPanel(r => ({ ...r, body: e.target.value }))}
                  />
                </div>
                <button onClick={runRequest} style={{
                  background: "rgba(0,255,178,0.15)", border: "1px solid rgba(0,255,178,0.4)",
                  color: "#00FFB2", padding: "12px", borderRadius: 8,
                  fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 700,
                  cursor: "pointer", letterSpacing: 2,
                }}>▶ SEND REQUEST</button>
              </div>
              <div>
                <label style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#555", letterSpacing: 1, display: "block", marginBottom: 10 }}>RESPONSE</label>
                <pre style={{
                  background: "rgba(0,255,178,0.03)", border: "1px solid rgba(0,255,178,0.1)",
                  borderRadius: 10, padding: 18, minHeight: 300,
                  fontFamily: "'DM Mono',monospace", fontSize: 12,
                  color: liveRes ? "#00FFB2" : "#333", overflowX: "auto",
                  margin: 0,
                }}>
                  {liveRes ? JSON.stringify(liveRes, null, 2) : "// Response will appear here"}
                </pre>
              </div>
            </div>
          </div>
        )}

      
        {activeTab === "logs" && (
          <div className="card-in">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontWeight: 800, fontSize: 22 }}>Request Logs</h2>
              <button onClick={() => setLogs([])} style={{
                background: "transparent", border: "1px solid rgba(255,107,107,0.3)",
                color: "#FF6B6B", padding: "6px 16px", borderRadius: 6,
                fontFamily: "'DM Mono',monospace", fontSize: 11, cursor: "pointer", letterSpacing: 1,
              }}>CLEAR</button>
            </div>
            {logs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "50px 0", color: "#333", fontFamily: "'DM Mono',monospace", fontSize: 13 }}>
                No requests logged yet.
              </div>
            ) : (
              <div>{logs.map((l, i) => <LogEntry key={i} entry={l} />)}</div>
            )}
          </div>
        )}
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
}
