# Nginx Proxy Behavior Examples
| Location   | Proxy Pass             | Request URL     | Forwarded URL   | Notes                                                          |
| ---------- | ---------------------- | --------------- | --------------- | -------------------------------------------------------------- |
| `/api/`    | `http://gateway:3000/` | `/api/users`    | `/users`        | ✅ Trailing slash strips `/api/` and forwards remainder         |
| `/api/`    | `http://gateway:3000`  | `/api/users`    | `/api/users`    | ❌ No trailing slash keeps full URI, backend must handle `/api` |
| `/api/v1/` | `http://gateway:3000/` | `/api/v1/users` | `/users`        | ✅ Perfect for versioned API; backend sees `/users`             |
| `/api/v1/` | `http://gateway:3000`  | `/api/v1/users` | `/api/v1/users` | ❌ Backend must handle `/api/v1`                                |
| `/`        | `http://frontend/`     | `/`             | `/`             | ✅ Serves frontend HTML                                         |

# Request Flow Examples

| Browser Request | Nginx Location Matched | Path Stripped      | Gateway Receives | Service Receives             |
| --------------- | ---------------------- | ------------------ | ---------------- | ---------------------------- |
| `/api/users`    | `/api/`                | `/api/` removed    | `/users`         | Users Service `/users`       |
| `/api/products` | `/api/`                | `/api/` removed    | `/products`      | Products Service `/products` |
| `/api/v1/users` | `/api/v1/`             | `/api/v1/` removed | `/users`         | Users Service `/users`       |
| `/`             | `/`                    | none               | `/`              | Frontend `/index.html`       |

# Rule of Thumb for Proxy Pass

| Proxy Pass Format               | Result                                                            |
| ------------------------------- | ----------------------------------------------------------------- |
| `proxy_pass http://backend/;` ✅ | Strips the matched location prefix and forwards the remaining URI |
| `proxy_pass http://backend;` ❌  | Keeps the full original URI including location prefix             |

# REST API Best Practices

| API Path         | Purpose                | Notes                         |
| ---------------- | ---------------------- | ----------------------------- |
| `/api/users`     | List all users         | Plural = collection           |
| `/api/users/:id` | Get specific user      | Plural + ID                   |
| `/api/user`      | Current logged-in user | Singular = “special” resource |
| `/api/products`  | List products          | Plural = collection           |
| `/api/v1/users`  | Versioned API          | Easy to upgrade later         |

# 🔹 Summary

1. Trailing slash in proxy_pass = strips location prefix

2. No trailing slash = preserves full original URI

3. Use plural nouns for collections, singular for special endpoints

4. Version APIs using /api/v1/... — backend stays clean