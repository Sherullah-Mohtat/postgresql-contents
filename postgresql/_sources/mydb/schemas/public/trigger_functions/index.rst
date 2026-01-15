|trigger_functions| Trigger Functions
=======================================

.. |trigger_functions| image:: /_static/images/sidebar_icons/trigger_functions.png

----------------------------------
Trigger Functions (PostgreSQL)
----------------------------------

1️⃣ What is a Trigger Function?
---------------------------------

A **trigger function** is a **special function** that:
	- **Cannot be called directly**
	- Is executed **automatically**
	- Runs **only when a trigger fires**

Think of it as:
    “Code that runs because something happened to a table.”

============================================================================================================================

2️⃣ Trigger Function vs Trigger
---------------------------------

.. list-table::
    :header-rows: 1

    * - Item
      - What it is
    * - Trigger Function
      - The logic (written in PL/pgSQL)
    * - Trigger
      - The event hook attached to a table

You always need **both.**

============================================================================================================================

3️⃣ Where trigger functions live (pgAdmin)
--------------------------------------------

From your tree:

.. code-block:: bash 

    Schemas
    └── public
        └── Trigger Functions

They are **schema objects**, just like tables and views.

============================================================================================================================

4️⃣ Basic structure of a trigger function
--------------------------------------------

.. code-block:: postgres 

    CREATE OR REPLACE FUNCTION public.my_trigger_fn()
    RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
        -- logic here
        RETURN NEW;
    END;
    $$;

Key rules:
	- RETURNS trigger (mandatory)
	- Must return:
        - NEW (for INSERT/UPDATE)
        - OLD (for DELETE)
        - or NULL (to cancel)

============================================================================================================================

5️⃣ The magic variables inside trigger functions
--------------------------------------------------

Inside a trigger function, PostgreSQL provides:

.. list-table:: 
    :header-rows: 1

    * - Variable
      - Meaning
    * - NEW
      - Row after change (INSERT/UPDATE)
    * - OLD
      - Row before change (UPDATE/DELETE)
    * - TG_OP
      - Operation (INSERT, UPDATE, DELETE)
    * - TG_TABLE_NAME
      - Table name
    * - TG_SCHEMA_NAME
      - Schema name
    * - TG_WHEN
      - BEFORE / AFTER

============================================================================================================================

6️⃣ Common real-world examples
--------------------------------

**Auto-update timestamp**

.. code-block:: postgres

    CREATE OR REPLACE FUNCTION set_updated_at()
    RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
        NEW.updated_at = now();
        RETURN NEW;
    END;
    $$;

Trigger:

.. code-block:: postgres 

    CREATE TRIGGER trg_set_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

============================================================================================================================

**Data validation**

.. code-block:: postgres 

    CREATE OR REPLACE FUNCTION prevent_negative_balance()
    RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
        IF NEW.balance < 0 THEN
            RAISE EXCEPTION 'Balance cannot be negative';
        END IF;
        RETURN NEW;
    END;
    $$;

**Audit logging**

.. code-block:: postgres 

    CREATE OR REPLACE FUNCTION audit_changes()
    RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
        INSERT INTO audit_log(table_name, action, changed_at)
        VALUES (TG_TABLE_NAME, TG_OP, now());

        RETURN NEW;
    END;
    $$;

============================================================================================================================

7️⃣ BEFORE vs AFTER triggers
-------------------------------

.. list-table::
    :header-rows: 1

    * - Timing
      - Use when
    * - BEFORE
      - Modify or reject data
    * - AFTER
      - Log, notify, sync
    * - INSTEAD OF
      - For views

Example:

.. code-block:: postgres 

    BEFORE INSERT
    AFTER UPDATE

============================================================================================================================

8️⃣ FOR EACH ROW vs FOR EACH STATEMENT
-----------------------------------------

.. list-table:: 
    :header-rows: 1

    * - Type
      - Runs
    * - FOR EACH ROW
      - Once per row
    * - FOR EACH STATEMENT
      - Once per SQL statement

Use:
	- Row-level for validation
	- Statement-level for logging

============================================================================================================================

9️⃣ Production best practices
------------------------------

✅ Use triggers for:
	- Audit fields
	- Data integrity
	- Security enforcement
	- Automatic consistency

❌ Avoid triggers for:
	- Business workflows
	- Heavy logic
	- External API calls

Why?
	- Triggers are implicit
	- Harder to debug
	- Run inside transactions

============================================================================================================================

🔟 Security model
----------------------

Trigger functions:
	- Run with **table owner privileges**
	- Can bypass RLS if written incorrectly

Best practice:

.. code-block:: postgres 

    ALTER FUNCTION my_trigger_fn() OWNER TO admin_role;
    REVOKE ALL ON FUNCTION my_trigger_fn() FROM PUBLIC;

============================================================================================================================

1️⃣1️⃣ How pgAdmin maps this
------------------------------

In pgAdmin:
	- **Trigger Functions** → the function
	- **Tables → Triggers** → the event binding

They are separate objects.

1️⃣2️⃣ Mental model (remember this)
-----------------------------------

Trigger Function = code
Trigger = when to run that code

============================================================================================================================

Summary
----------

Trigger Functions are:
	- Schema-level functions
	- Executed automatically by triggers
	- Used for enforcing rules, automation, and safety
	- A core building block for serious PostgreSQL systems


















