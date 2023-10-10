-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SearchObject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "soldatId" TEXT NOT NULL,
    "contractDate" TEXT NOT NULL,
    "locateCall" TEXT NOT NULL,
    "stateNumber" TEXT NOT NULL,
    "callSign" TEXT NOT NULL,
    "specialSigns" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SearchObject_number_fkey" FOREIGN KEY ("number") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
