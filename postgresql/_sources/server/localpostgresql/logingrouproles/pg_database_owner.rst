pg_database_owner
==================

----------------------------
What is pg_database_owner?
----------------------------

pg_database_owner is a special dynamic role that always represents the owner of the current database.

It acts like an **alias** or **pointer,** not a fixed user.

Key Idea
	•	pg_database_owner **does not have a password**
	•	You **cannot log in as it**
	•	You **cannot drop it**
	•	PostgreSQL **automatically maps it** to whoever owns the database you are connected to

Example

Let’s say:

.. code-block:: postgres 

    ALTER DATABASE test OWNER TO sherullahmohtat;

Now:
	- Database: test
	- Owner: sherullahmohtat

Inside database test:
	- pg_database_owner = sherullahmohtat

If you change the owner:

.. code-block:: postgres 

    ALTER DATABASE test OWNER TO postgres;

Now:
	- pg_database_owner = postgres

**The role automatically “follows” the database owner.**

=============================================================================================================

--------------------------------------
Why does PostgreSQL need this role?
--------------------------------------

1. Safer privilege management

Instead of granting privileges to a **specific username**, PostgreSQL lets you do:

.. code-block:: postgres 

    GRANT ALL ON SCHEMA public TO pg_database_owner;

This means:
	- “Whoever owns this database should have full access”

Even if the owner changes later — permissions stay correct.

2. Used internally by PostgreSQL

PostgreSQL uses it for:
	- Schema ownership
	- Default privileges
	- Extensions
	- System-managed permissions

3. Best practice for schemas

PostgreSQL 15+ often uses:

.. code-block:: postgres 

    ALTER SCHEMA public OWNER TO pg_database_owner;

Instead of hard-coding a user.

=============================================================================================================

---------------------------------------
Compare with other pg_* roles you see
---------------------------------------

.. list-table:: 
    :header-rows: 1

    * - Role
      - Purpose
    * - pg_database_owner
      - Owner of current database
    * - pg_read_all_data
      - Read all tables
    * - pg_write_all_data
      - Write all tables
    * - pg_monitor
      - Monitoring & stats
    * - pg_signal_backend
      - Control backends
    * - pg_execute_server_program
      - Run server-side programs

**Only pg_database_owner is database-specific**

🚫 Common Mistakes (Avoid These)
    - ❌ Trying to log in as pg_database_owner
    - ❌ Trying to assign a password
    - ❌ Thinking it’s a real user
    - ❌ Dropping or modifying it

✅ When should YOU use it?

Use pg_database_owner when:
    - ✔ Managing schemas
    - ✔ Writing reusable SQL scripts
    - ✔ Creating extensions
    - ✔ Designing production-safe databases

Example:

.. code-block:: postgres 

    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public
    TO pg_database_owner;


Mental Model (Easy to Remember)

    **pg_database_owner = “Whoever owns THIS database right now”**

It’s a **smart placeholder,** not a person.


