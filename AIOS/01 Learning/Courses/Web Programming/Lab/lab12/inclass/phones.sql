BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "phones" (
	"id"	INTEGER,
	"name"	varchar(120) NOT NULL,
	"price"	REAL NOT NULL,
	"storage"	varchar(50) NOT NULL,
	"camera"	varchar(20) NOT NULL,
	"pimage"	varchar(100) NOT NULL,
	PRIMARY KEY("id")
);
INSERT INTO "phones" VALUES (1,'Samsung Galaxy S25 Ultra',1299.0,'12/512 GB','200MP','image-31.jpg');
INSERT INTO "phones" VALUES (2,'iPhone 16 Pro Max',1199.0,'8/256 GB','48MP','image-32.jpg');
INSERT INTO "phones" VALUES (3,'Google Pixel 10 Pro',1219.0,'12/256 GB','48MP','image-33.jpg');
INSERT INTO "phones" VALUES (4,'Huawei Pura 80 Ultra',1680.0,'12/512 GB','50MP','image-34.jpg');
INSERT INTO "phones" VALUES (5,'Samsung Galaxy Z Fold 7',2420.0,'12/256 GB','200MP','image-35.jpg');
INSERT INTO "phones" VALUES (6,'Samsung Galaxy Z Flip 7',1099.0,'12/256 GB','50MP','image-36.jpg');
INSERT INTO "phones" VALUES (7,'OnePlus 13',999.0,'12/256 GB','50MP','image-37.jpg');
COMMIT;
