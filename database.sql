CREATE TABLE "tasks" (
"id" serial primary key,
"name" varchar (200),
"complete" boolean
);

INSERT INTO "tasks" ("name", "complete")
VALUES 
            ('Make todo list', 'no'),
            ('Make Dinner', 'yes'),
            ('Take out trash.', 'yes');