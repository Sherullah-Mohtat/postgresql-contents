|schemas| Schemas 
==================

.. |schemas| image:: /_static/images/sidebar_icons/schemas.png

---------------------------------
What is a Schema in PostgreSQL?
---------------------------------

A **schema** is a **namespace inside a database.**

Think of it like:
	- 📁 Folder inside a database
	- 🏷️ Logical container for tables, views, functions
	- 🔐 Security boundary

Database → Schemas → Tables / Views / Functions

====================================================================================================

In **MyDB → Schemas (1)** you see:

.. code-block:: bash 

   Schemas
   └── public


This means:
	- Your database MyDB has only one schema
	- That schema is the default public schema

====================================================================================================

What is the public schema?

public is:
	- Created automatically
	- Exists in every database
	- Writable by **everyone by default**

Default behavior:

.. code-block:: postgres 

   CREATE TABLE users (...);

Actually becomes:

.. code-block:: postgres 

   CREATE TABLE public.users (...);

====================================================================================================

--------------------------
Why public is dangerous
--------------------------

In real projects / production:
   - ❌ Anyone can create objects
   - ❌ Name collisions happen
   - ❌ No clear ownership
   - ❌ Hard to manage permissions
   - ❌ Bad for multi-app databases

That’s why **professional DBAs do NOT use public directly**.

====================================================================================================

-------------------------------------
Best Practice: Use multiple schemas
-------------------------------------

Instead of putting everything in public, we do this:

.. list-table::
   :header-rows: 1

   * - Schema
     - Purpose
   * - app
     - Application tables
   * - auth
     - Authentication / users
   * - audit
     - Logs & audit tables
   * - ref
     - Reference / lookup data
   * - admin
     - DBA-only objects

====================================================================================================

---------------------
Real-world analogy
---------------------
.. list-table::
   :header-rows: 1

   * - PostgreSQL
     - Operating System
   * - Database
     - Hard Drive
   * - Schema
     - Folder
   * - Table
     - File

You don’t put **everything in one folder**, right? Same idea.

====================================================================================================

-----------------------------
Let’s create proper schemas
-----------------------------

Run this in **MyDB:**

.. code-block:: postgres 

   CREATE SCHEMA app AUTHORIZATION sherullahmohtat;
   CREATE SCHEMA auth AUTHORIZATION sherullahmohtat;
   CREATE SCHEMA audit AUTHORIZATION sherullahmohtat;

Now pgAdmin will show:

.. code-block:: bash 

   Schemas (4)
   ├── app
   ├── auth
   ├── audit
   └── public

====================================================================================================

---------------------
🔒 Lock down public
---------------------

This prevents accidental usage:

.. code-block:: postgres 

   REVOKE CREATE ON SCHEMA public FROM PUBLIC;
   REVOKE ALL ON SCHEMA public FROM PUBLIC;

Now:
	- ❌ No one can create tables in public
	- ✅ You control where objects go

====================================================================================================

------------------------------
Create tables the RIGHT way
------------------------------

Instead of:

.. code-block:: postgres 

   CREATE TABLE users (...);

Do:

.. code-block:: postgres

   CREATE TABLE app.users (...);
   CREATE TABLE auth.accounts (...);
   CREATE TABLE audit.logs (...);

Clear, safe, professional.

====================================================================================================

---------------------------------------------
🔍 How PostgreSQL finds tables (search_path)
---------------------------------------------

Postgres uses:

.. code-block:: postgres 

   SHOW search_path;

Default:

.. code-block:: postgres 

   "$user", public

You can set it per role:

.. code-block:: postgres 

   ALTER ROLE sherullahmohtat SET search_path = app, auth;

Now:

.. code-block:: postgres 

   CREATE TABLE users (...);

→ goes into app.users

====================================================================================================

**Summary (DBA mindset)**

- ✔ Schema = namespace
- ✔ public is default but unsafe
- ✔ Always create app-specific schemas
- ✔ Lock down public
- ✔ Control ownership & permissions









.. toctree::
   :hidden:
   :maxdepth: 4

   public/index