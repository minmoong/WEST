-- AlterTable
CREATE SEQUENCE comment_id_seq;
ALTER TABLE "Comment" ALTER COLUMN "id" SET DEFAULT nextval('comment_id_seq'),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
ALTER SEQUENCE comment_id_seq OWNED BY "Comment"."id";
