Event Triggers 
================

----------------------------------------
What are Event Triggers in PostgreSQL?
----------------------------------------

**Event Triggers** are special triggers that fire **when database schema events occur**, not when table data changes.

    ❗ They react to **DDL commands**, not INSERT / UPDATE / DELETE.

=============================================================================================================================

**Normal Trigger vs Event Trigger**

.. list-table::
    :header-rows: 1

    * - Feature
      - Normal Trigger
      - Event Trigger
    * - Fires on
      - Table rows
      - Database events
    * - Commands
      - INSERT, UPDATE, DELETE
      - CREATE, ALTER, DROP
    * - Scope
      - One table
      - Entire database
    * - Use case
      - Validate data
      - Control schema changes

=============================================================================================================================

---------------------------------------------
Examples of Events Event Triggers Can Catch
---------------------------------------------

Event Triggers fire on commands like:
	- CREATE TABLE
	- DROP TABLE
	- ALTER FUNCTION
	- CREATE INDEX
	- DROP SCHEMA
	- CREATE EXTENSION

They **do not care about rows.**

=============================================================================================================================

-----------------------------------
Why PostgreSQL Has Event Triggers
-----------------------------------

Event triggers exist to:
	- Enforce schema governance
	- Audit schema changes
	- Prevent dangerous operations
	- Control production databases
	- Log DDL activity

=============================================================================================================================

--------------------------------------
How Event Triggers Work (Internally)
--------------------------------------

1.	A DDL command runs

2.	PostgreSQL checks registered event triggers

3.	Matching triggers execute

4.	The DDL may:
	- Continue
	- Be logged
	- Be blocked (by raising error)

=============================================================================================================================

-------------------------------
Types of Event Trigger Events
-------------------------------

There are two main event trigger hooks:

1️⃣ ddl_command_start
---------------------

Triggered **before** the DDL command runs.

Use cases:
	- Block operations
	- Validate rules
	- Prevent DROP in prod

2️⃣ ddl_command_end
--------------------

Triggered **after** the DDL command runs.

Use cases:
	- Audit logs
	- Capture metadata
	- Notify systems

=============================================================================================================================

------------------------------------
Simple Example: Log Table Creation
------------------------------------

**Step 1: Create a logging table**

.. code-block:: sql 

    CREATE TABLE ddl_log (
        event_time timestamptz,
        command text
    );

**Step 2: Create event trigger function**

.. code-block:: postgres  

    CREATE OR REPLACE FUNCTION log_ddl()
    RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
        INSERT INTO ddl_log
        VALUES (now(), tg_tag);
    END;
    $$;

**Step 3: Create event trigger**

.. code-block:: sql 

    CREATE EVENT TRIGGER log_ddl_trigger
    ON ddl_command_end
    EXECUTE FUNCTION log_ddl();

**Step 4: Test it**

.. code-block:: sql 

    CREATE TABLE test_table (id int);

✅ Logged automatically.

=============================================================================================================================

--------------------------------------------
Blocking Dangerous Commands (Very Powerful)
--------------------------------------------

Example: Prevent dropping tables

.. code-block:: postgres 

    CREATE OR REPLACE FUNCTION block_drop()
    RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
        RAISE EXCEPTION 'DROP operations are not allowed!';
    END;
    $$;

    CREATE EVENT TRIGGER no_drop
    ON ddl_command_start
    WHEN TAG IN ('DROP TABLE')
    EXECUTE FUNCTION block_drop();

**Production-grade protection**

=============================================================================================================================

---------------------------------------
Why You Don’t See Many Event Triggers
---------------------------------------

Because:
	- They are DBA-level
	- Not used in normal apps
	- One mistake can break migrations
	- Require deep PostgreSQL knowledge

That’s why pgAdmin shows:

    Event Triggers (0 or 1)

=============================================================================================================================

---------------------------------
Where Event Triggers Are Stored
---------------------------------

Internally in:
	- pg_event_trigger
	- pg_proc
	- pg_class

You can inspect them:

.. code-block:: sql 

    SELECT * FROM pg_event_trigger;

=============================================================================================================================

Important Rules ⚠️

❌ Cannot be:
	- Row-level
	- Table-specific

✔ Must:
	- Use RETURNS event_trigger
	- Use plpgsql or trusted language
	- Be created by superuser (usually)

=============================================================================================================================

-------------------------------------
When SHOULD You Use Event Triggers?
-------------------------------------

✅ Use if you need:
	- Schema change auditing
	- Compliance enforcement
	- Lock down production DB
	- Controlled migrations

❌ Don’t use for:
	- App logic
	- Data validation
	- ORM behavior

.. note::

    Summary 

    Event Triggers in PostgreSQL are database-level triggers that fire on schema-changing commands (DDL), such as CREATE, ALTER, or DROP, allowing administrators to audit, control, or restrict structural changes across the entire database.
