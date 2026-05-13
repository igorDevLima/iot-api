-- CreateTable
CREATE TABLE "sensor_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "umidade" REAL NOT NULL,
    "temperatura" REAL NOT NULL,
    "relay_on" BOOLEAN NOT NULL DEFAULT false,
    "proximity" BOOLEAN NOT NULL DEFAULT false,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "device_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
