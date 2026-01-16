|triggers| Triggers 
=====================

.. |triggers| image:: /_static/images/sidebar_icons/triggers.png

-----------------------
What is a Trigger?
-----------------------

In PostgreSQL, a Trigger is:
    Automatic logic that runs when data changes in a table

Triggers react to events like:
	- INSERT
	- UPDATE
	- DELETE
	- TRUNCATE

They are **event-driven**, not manually called.

==========================================================================================================================

-------------------------------------
Where Triggers fit in execution
-------------------------------------

Order matters:

.. code-block:: bash 

    SQL statement
    ↓
    RULE system (query rewrite)
    ↓
    RLS policies
    ↓
    TRIGGERS  ← YOU ARE HERE
    ↓
    Actual row change

Triggers run **inside the transaction**, safely.

==========================================================================================================================

**pgAdmin: What you’re seeing**

In your tree:

.. code-block:: bash 

    students
    └── Triggers

This means:
	- The table can react to changes
	- Right now, it may be empty
	- Triggers here are **attached to students**

Triggers always belong to **a table**, not globally.

==========================================================================================================================

**Trigger = 2 parts (VERY IMPORTANT)**

A trigger is **NOT just one thing.**

**1️⃣ Trigger Function**

Logic written in PL/pgSQL

**2️⃣ Trigger**

The event hook that calls the function

Think of it like:

.. code-block:: bash 

    Doorbell (Trigger)
    ↓
    Bell sound (Trigger Function)

==========================================================================================================================

**Example use cases (real world)**

Triggers are used for:
	- updated_at timestamps
	- Audit logs
	- Soft deletes
	- Enforcing complex rules
	- Maintaining derived data
	- Multi-table consistency

==========================================================================================================================

**Step 1: Trigger Function**

Let’s auto-update updated_at when a student row changes.

**Trigger function**

.. code-block:: postgres 

    CREATE OR REPLACE FUNCTION set_updated_at()
    RETURNS trigger AS $$
    BEGIN
        NEW.updated_at = now();
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

Key points:
	- RETURNS trigger → required
	- NEW → new row values
	- OLD → previous row values (for UPDATE/DELETE)


==========================================================================================================================

**Step 2: Create the Trigger**

Attach it to the students table:

.. code-block:: postgres 

    CREATE TRIGGER students_set_updated_at
    BEFORE UPDATE ON students
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

Now:

.. code-block:: postgres 

    UPDATE students SET name = 'Ali' WHERE id = 1;

updated_at updates automatically.

==========================================================================================================================

-----------------
Trigger timing
-----------------

.. list-table:: 
    :header-rows: 1

    * - Timing
      - Meaning
    * - BEFORE
      - Can modify data
    * - AFTER
      - Data already written
    * - INSTEAD OF
      - Used for views

Example:

.. code-block:: postgres 

    BEFORE INSERT
    AFTER UPDATE

==========================================================================================================================

**Row-level vs Statement-level**

**Row-level (most common)**

.. code-block:: postgres 

    FOR EACH ROW

Runs **once per row.**

**Statement-level**

.. code-block:: postgres 

    FOR EACH STATEMENT

Runs **once per query**, even if 1,000 rows affected.

==========================================================================================================================

**INSERT / UPDATE / DELETE examples**

**INSERT trigger**

.. code-block:: postgres 

    AFTER INSERT ON students

**UPDATE trigger**

.. code-block:: postgres 

    BEFORE UPDATE ON students

**DELETE trigger**

.. code-block:: postgres 

    AFTER DELETE ON students

==========================================================================================================================

**Using OLD and NEW**

.. list-table:: 
    :header-rows: 1

    * - Event
      - OLD
      - NEW
    * - INSERT
      - ❌
      - ✅
    * - UPDATE
      - ✅
      - ✅
    * - DELETE
      - ✅
      - ❌

Example (prevent deleting graduated students):

.. code-block:: postgres 

    CREATE OR REPLACE FUNCTION prevent_graduated_delete()
    RETURNS trigger AS $$
    BEGIN
        IF OLD.graduated = true THEN
            RAISE EXCEPTION 'Cannot delete graduated student';
        END IF;
        RETURN OLD;
    END;
    $$ LANGUAGE plpgsql;

==========================================================================================================================

**Trigger vs Rule**

.. list-table:: 
    :header-rows: 1

    * - Feature
      - Trigger
      - Rule
    * - Execution
      - Runtime
      - Rewrite-time
    * - Row aware
      - ✅ Yes
      - ❌ No
    * - Safe
      - ✅ Yes
      - ❌ Risky
    * - Modern
      - ✅ Standard
      - ❌ Avoid

Triggers are the correct choice

==========================================================================================================================

**Trigger vs RLS**

.. list-table:: 
    :header-rows: 1

    * - Feature
      - Trigger
      - RLS
    * - Purpose
      - Logic
      - Security
    * - Bypassable
      - ❌ No
      - ❌ No
    * - Best for
      - Auditing
      - Access control

They **work together**, not replace each other.

==========================================================================================================================

-------------------------
How to inspect triggers
-------------------------
.. code-block:: postgres 

    SELECT * FROM information_schema.triggers
    WHERE event_object_table = 'students';

How to drop a trigger

.. code-block:: postgres 

    DROP TRIGGER students_set_updated_at ON students;

Performance notes (important)
	- Triggers run inside transactions
	- Bad triggers can slow writes
	- Keep them:
        - Small
        - Deterministic
        - Fast

==========================================================================================================================

**Mental model**

Triggers react to data

Rules rewrite SQL

RLS controls visibility