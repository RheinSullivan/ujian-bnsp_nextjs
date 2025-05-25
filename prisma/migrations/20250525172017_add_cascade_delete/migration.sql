-- DropForeignKey
ALTER TABLE `peserta` DROP FOREIGN KEY `Peserta_Kd_skema_fkey`;

-- DropIndex
DROP INDEX `Peserta_Kd_skema_fkey` ON `peserta`;

-- AddForeignKey
ALTER TABLE `Peserta` ADD CONSTRAINT `Peserta_Kd_skema_fkey` FOREIGN KEY (`Kd_skema`) REFERENCES `Skema`(`Kd_skema`) ON DELETE CASCADE ON UPDATE CASCADE;
