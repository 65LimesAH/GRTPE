# Migration `20201112204028-init`

This migration has been generated by 65LimesAH at 11/12/2020, 2:40:28 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
"id" SERIAL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201112204028-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,21 @@
+datasource db {
+  provider = "postgres"
+  url = "***"
+}
+
+generator prisma {
+  provider        = "prisma-client-js"
+  binaryTargets   = ["native", "linux-musl"]
+}
+
+model User {
+  id        Int      @id @default(autoincrement())
+  email     String   @unique
+  password  String
+  firstName String?
+  lastName  String?
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+}
+
+
```

