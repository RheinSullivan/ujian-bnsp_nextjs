-- CreateTable
CREATE TABLE `Skema` (
    `Kd_skema` VARCHAR(191) NOT NULL,
    `Nm_skema` VARCHAR(191) NOT NULL,
    `Jenis` VARCHAR(191) NOT NULL,
    `Jml_unit` INTEGER NOT NULL,

    PRIMARY KEY (`Kd_skema`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Peserta` (
    `Id_peserta` INTEGER NOT NULL AUTO_INCREMENT,
    `Foto_peserta` VARCHAR(191) NULL,
    `Nm_peserta` VARCHAR(191) NOT NULL,
    `Kd_skema` VARCHAR(191) NOT NULL,
    `Jekel` VARCHAR(191) NOT NULL,
    `Alamat` VARCHAR(191) NOT NULL,
    `No_hp` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id_peserta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Peserta` ADD CONSTRAINT `Peserta_Kd_skema_fkey` FOREIGN KEY (`Kd_skema`) REFERENCES `Skema`(`Kd_skema`) ON DELETE RESTRICT ON UPDATE CASCADE;
