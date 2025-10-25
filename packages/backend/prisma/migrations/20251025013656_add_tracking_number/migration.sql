-- AlterTable
ALTER TABLE "Order" ADD COLUMN "trackingNumber" TEXT;

-- CreateIndex
CREATE INDEX "Order_trackingNumber_idx" ON "Order"("trackingNumber");
