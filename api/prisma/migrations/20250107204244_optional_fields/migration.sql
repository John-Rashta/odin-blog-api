-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "authorid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "authorid" DROP NOT NULL;
