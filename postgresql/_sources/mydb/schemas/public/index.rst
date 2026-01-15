|public| public 
=================

.. |public| image:: /_static/images/sidebar_icons/public.png

----------------------------------
1. What is public in PostgreSQL?
----------------------------------

public is a schema, not a database, not a table.

📦 Database → 📁 Schemas → 📄 Tables

So here:

.. code-block:: bash 

   MyDB
   └── Schemas (1)
      └── public

public is **the default schema inside every PostgreSQL database.**

==========================================================================================================

----------------------------
2. Why does public exist?
----------------------------

PostgreSQL creates public automatically so beginners can:
	- Create tables immediately
	- Avoid learning schemas at the start
	- Run SQL without qualification

Example:

.. code-block:: postgres 

   CREATE TABLE users (...);

Postgres silently does:

.. code-block:: postgres 

   CREATE TABLE public.users (...);

==========================================================================================================

---------------------------------
3. Default behavior of public
---------------------------------

By default:

.. list-table::
   :header-rows: 1

   * - Behavior
     - Status
   * - Exists automatically
     - ✅
   * - In every database
     - ✅
   * - Writable by everyone
     - ⚠️ YES
   * - In search_path
     - ✅
   * - Beginner-friendly
     - ✅
   * - Production-safe
     - ❌

==========================================================================================================

---------------------------------------------
4. Why public is dangerous in real systems
---------------------------------------------

This is **very important.**

Problems with public
	#.	Everyone can create tables
	#.	No ownership boundaries
	#.	Name collisions
	#.	Security risks
	#.	Hard to audit
	#.	Bad multi-app support

Example nightmare:

.. code-block:: postgres 

   CREATE TABLE users (...);   -- app A
   CREATE TABLE users (...);   -- app B

Same schema → conflict.

==========================================================================================================

How PostgreSQL finds public (search_path)

Check:

.. code-block:: postgres 

   SHOW search_path;

Default:

.. code-block:: postgres 

   "$user", public

Meaning:
	#.	Look in schema named after user
	#.	Then look in public

That’s why tables “magically” work without schema names.

==========================================================================================================

----------------------
5. Who owns public?
----------------------

.. code-block:: postgres 

   SELECT nspname, nspowner::regrole
   FROM pg_namespace
   WHERE nspname = 'public';

Usually:

.. code-block:: postgres 

   public | postgres

But **permissions** are open unless you change them.

==========================================================================================================

-------------------------------------------
6. Best Practice (what professionals do)
-------------------------------------------

1️⃣ Keep public EMPTY

Do not put app tables there.

2️⃣ Lock it down

.. code-block:: postgres 

   REVOKE CREATE ON SCHEMA public FROM PUBLIC;
   REVOKE ALL ON SCHEMA public FROM PUBLIC;

Now:
	- No accidental tables
	-  No unauthorized access

3️⃣ Create real schemas

.. code-block:: postgres

   CREATE SCHEMA app;
   CREATE SCHEMA auth;
   CREATE SCHEMA audit;

4️⃣ Use explicit schema names

.. code-block:: postgres 

   CREATE TABLE app.users (...);
   CREATE TABLE auth.accounts (...);

==========================================================================================================

-------------------------------------
7. What public is still useful for
-------------------------------------

You can keep public for:
   - Extensions (sometimes)
   - Shared utility views
   - Temporary experiments (dev only)

But **never core business tables.**

==========================================================================================================

Important rule to remember

public is for learning — not for production.

==========================================================================================================

Summary

- ✔ public = default schema
- ✔ Exists in every database
- ✔ Auto-used by SQL
- ❌ Open permissions by default
- ❌ Not production-safe
- ✅ Lock it down
- ✅ Create app-specific schemas








.. =======Table of Contents Parent–child structure============

.. toctree::
   :hidden:
   :maxdepth: 17

   aggregates/index
   collations/index 
   domains/index 
   fts_configurations/index
   fts_dictionaries/index
   fts_parsers/index 
   fts_templates/index
   foreign_tables/index
   functions/index
   materialized_views/index
   operators/index
   procedures/index
   sequences/index
   tables/index
   trigger_functions/index
   types/index
   views/index


