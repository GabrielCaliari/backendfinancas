/*
  Warnings:

  - Added the required column `payment_method` to the `receives` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_receives" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    CONSTRAINT "receives_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_receives" ("created_at", "date", "description", "id", "type", "updated_at", "user_id", "value") SELECT "created_at", "date", "description", "id", "type", "updated_at", "user_id", "value" FROM "receives";
DROP TABLE "receives";
ALTER TABLE "new_receives" RENAME TO "receives";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
