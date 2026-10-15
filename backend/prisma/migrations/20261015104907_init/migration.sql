-- CreateEnum
CREATE TYPE "EnquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "enquiries" (
    "id" UUID NOT NULL,
    "parent_name" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "baby_age_group" VARCHAR(50) NOT NULL,
    "preferred_date" DATE NOT NULL,
    "unit_no" VARCHAR(100) NOT NULL,
    "society" VARCHAR(150) NOT NULL,
    "locality" VARCHAR(150) NOT NULL,
    "address" TEXT,
    "additional_message" TEXT,
    "status" "EnquiryStatus" NOT NULL DEFAULT 'NEW',
    "internal_notes" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "enquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "enquiries_status_idx" ON "enquiries"("status");

-- CreateIndex
CREATE INDEX "enquiries_created_at_idx" ON "enquiries"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");
