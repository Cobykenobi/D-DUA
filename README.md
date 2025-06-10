 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
index 0bfd324f2965dad5edfe46d5958ccbd85003cb64..4758674b85d8a40b450a9f825c8bbb89066787fd 100644
--- a/README.md
+++ b/README.md
@@ -1,2 +1,6 @@
 # D-DUA
 D-DUA
+
+The backend automatically creates `uploads/` and `uploads/maps/` directories on
+startup to store uploaded images. Files placed there are served from the
+`/uploads` path.
 
EOF
)