|views| Views
===============

.. |views| image:: /_static/images/sidebar_icons/views.png

--------------------
1️⃣ What is a View?
--------------------

A **View** is a **virtual table.**

It:
	- Stores **no data**
	- Stores **a SQL query**
	- Always shows **up-to-date results**

Think of it as:
    “A saved SELECT statement that behaves like a table”

============================================================================================================================

----------------------
2️⃣ Simple example
----------------------

Base table

.. code-block:: postgres 

    CREATE TABLE users (
        id serial PRIMARY KEY,
        email text,
        password_hash text,
        is_active boolean
    );

View

.. code-block:: postgres 

    CREATE VIEW active_users AS
    SELECT id, email
    FROM users
    WHERE is_active = true;

Use it like a table

.. code-block:: postgres 

    SELECT * FROM active_users;

✔ No password exposed

✔ Cleaner queries

✔ Reusable logic

============================================================================================================================

-----------------------------------
3️⃣ Why Views exist (real reasons)
-----------------------------------

🔹 Hide complexity

Instead of:

.. code-block:: postgres 

    SELECT ...
    FROM a
    JOIN b
    JOIN c
    WHERE ...

Use:

.. code-block:: postgres 

    SELECT * FROM user_profile_view;

============================================================================================================================

**Security (VERY important)**

Views can:
	- Hide sensitive columns
	- Work with Row Level Security
	- Restrict access without duplicating tables

Example:

.. code-block:: postgres 

    GRANT SELECT ON active_users TO app_user;
    REVOKE ALL ON users FROM app_user;

The app **never touches the base table.**

============================================================================================================================

**API-ready schemas**

Tools like:
	- PostgREST
	- Hasura
	- GraphQL engines

Love views because they:
	- Look like tables
	- Are safe
	- Are stable contracts

============================================================================================================================

------------------------------
4️⃣ View vs Materialized View
------------------------------

.. list-table::
    :header-rows: 1

    * - Feature
      - View
      - Materialized View
    * - Storage
      - ❌ none
      - ✅ stored
    * - Always fresh
      - ✅ yes
      - ❌ until refresh
    * - Fast reads
      - ❌ depends
      - ✅ very fast
    * - Suggest for
      - APIs, security
      - Analytics, reports

============================================================================================================================

------------------------------------------
5️⃣ Can you INSERT/UPDATE through a View?
------------------------------------------

**Simple views → YES**

If:
	- One table
	- No aggregates
	- No joins

.. code-block:: postgres 

    CREATE VIEW user_emails AS
    SELECT id, email FROM users;

You can:

.. code-block:: postgres 

    UPDATE user_emails SET email = 'x@test.com' WHERE id = 1;

**Complex views → NO (by default)**

Unless you add:
	- INSTEAD OF triggers

============================================================================================================================

----------------------------------
6️⃣ Views + RLS (powerful combo)
----------------------------------

You can:
	- Enable RLS on base tables
	- Expose only views to the app
	- Keep business rules inside the DB

Example:

.. code-block:: postgres 

    CREATE VIEW my_orders AS
    SELECT *
    FROM orders
    WHERE user_id = current_setting('app.user_id')::int;

This is **production-grade security.**

============================================================================================================================

------------------------
7️⃣ Views vs Functions
------------------------

.. list-table::
    :header-rows: 1

    * - Views
      - Functions
    * - Look like tables
      - Look like calls
    * - Composable in SQL
      - Procedural
    * - Best for reads
      - Best for logic
    * - API-friendly
      - Backend-friendly

Rule of thumb:
	•	READ → View
	•	WRITE / LOGIC → Function

============================================================================================================================

----------------------------------------
8️⃣ What pgAdmin “Views” folder shows
----------------------------------------

In pgAdmin, under Views, you’ll see:
	- All user-created views
	- System views (if enabled)
	- Editable SQL definition

You can:
	- Right-click → View/Edit definition
	- Grant permissions
	- Drop / replace safely

============================================================================================================================

---------------------------------
9️⃣ Production best practices
---------------------------------

- ✔ Use views as API contracts
- ✔ Never expose base tables directly
- ✔ Use CREATE OR REPLACE VIEW
- ✔ Name views clearly (v___, api___, public___)
- ✔ Pair with RLS for real security

============================================================================================================================

---------------------------------
🔟 Mental model (lock this in)
---------------------------------

**Table** = truth

**View** = perspective

**Materialized View** = snapshot





















