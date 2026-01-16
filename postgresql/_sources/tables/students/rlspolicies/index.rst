|rls_policies| RLS Policies 
===============================

.. |rls_policies| image:: /_static/images/sidebar_icons/rls_policies.png

-------------------------
What are RLS Policies?
-------------------------

In PostgreSQL, Row Level Security (RLS) means:
    The database itself decides which rows a user is allowed to see or modify.

Not the app.

Not the API.

**The database.**

This is why RLS is considered **zero-trust security.**

======================================================================================================================================

Why RLS exists (the real problem)

Without RLS:

.. code-block:: postgres 

    SELECT * FROM students;

If a user has SELECT permission → **they see ALL rows.**

That’s dangerous for:
	- Multi-tenant apps
	- APIs (PostgREST, Hasura)
	- User-based systems
	- Compliance (PII, FERPA, GDPR, etc.)

======================================================================================================================================

----------------------------
Where RLS lives (pgAdmin)
----------------------------

You’re looking at the right place:

.. code-block:: bash 

    students
    └── RLS Policies

Important:
	- RLS is **disabled by default**
	- Policies do **nothing** until RLS is enabled

======================================================================================================================================

**Step 1: Example students table (simplified)**

.. code-block:: postgres 

    CREATE TABLE students (
        id           BIGSERIAL PRIMARY KEY,
        name         TEXT NOT NULL,
        email        TEXT UNIQUE NOT NULL,
        owner_id     UUID NOT NULL,
        created_at   TIMESTAMPTZ DEFAULT now()
    );

owner_id = which user owns this row.

======================================================================================================================================

**Step 2: Enable RLS on the table**

.. code-block:: postgres 

    ALTER TABLE students ENABLE ROW LEVEL SECURITY;

From this moment:
	- PostgreSQL **blocks all access**
	- Until policies are added

======================================================================================================================================

**Step 3: How PostgreSQL knows “who is the user”**

PostgreSQL uses:
	- CURRENT_USER
	- or session variables (most common for APIs)

Example session variable:

.. code-block:: postgres 

    SET app.user_id = '550e8400-e29b-41d4-a716-446655440000';

Later we’ll use:

.. code-block:: postgres 

    current_setting('app.user_id')::uuid

======================================================================================================================================

**Step 4: SELECT policy (read-only access)**

A user can **only see their own students**

.. code-block:: postgres 

    CREATE POLICY students_select_own
    ON students
    FOR SELECT
    USING (
        owner_id = current_setting('app.user_id')::uuid
    );

Meaning:
	- PostgreSQL adds this automatically:

.. code-block:: postgres 

    WHERE owner_id = <current user>

======================================================================================================================================

**Step 5: INSERT policy (create rows)**

A user can only insert rows owned by themselves

.. code-block:: postgres 

    CREATE POLICY students_insert_own
    ON students
    FOR INSERT
    WITH CHECK (
        owner_id = current_setting('app.user_id')::uuid
    );

Why WITH CHECK?
	- It validates **new rows**

======================================================================================================================================

**Step 6: UPDATE policy (modify own rows)**

.. code-block:: postgres 

    CREATE POLICY students_update_own
    ON students
    FOR UPDATE
    USING (
        owner_id = current_setting('app.user_id')::uuid
    )
    WITH CHECK (
        owner_id = current_setting('app.user_id')::uuid
    );

This prevents:
	- Editing someone else’s row
	- Changing ownership

======================================================================================================================================

**Step 7: DELETE policy (delete own rows)**

.. code-block:: postgres 

    CREATE POLICY students_delete_own
    ON students
    FOR DELETE
    USING (
        owner_id = current_setting('app.user_id')::uuid
    );

**What happens now**

Once RLS is enabled:

.. list-table::
    :header-rows: 1

    * - Action
      - Without Policy
      - With Policy
    * - SELECT
      - ❌ blocked
      - ✅ filtered
    * - INSERT
      - ❌ blocked
      - ✅ validated
    * - UPDATE
      - ❌ blocked
      - ✅ controlled
    * - DELETE
      - ❌ blocked
      - ✅ controlled

======================================================================================================================================

**RLS + Indexes (very important)**

RLS conditions are real WHERE clauses.

So you MUST index them:

.. code-block:: postgres 

    CREATE INDEX idx_students_owner
    ON students(owner_id);

Without this → slow queries.

======================================================================================================================================

**RLS vs Application Logic**

.. list-table::
    :header-rows: 1

    * - Layer
      - Can be bypassed?
    * - Frontend
      - ✅
    * - Backend
      - ✅
    * - API
      - ✅
    * - Database RLS
      - ❌

That’s why PostgREST & Hasura **depend on RLS.**

======================================================================================================================================

**Common RLS mistakes (avoid these)**

- ❌ Forgetting to enable RLS
- ❌ Missing indexes on policy columns
- ❌ Using SECURITY DEFINER incorrectly
- ❌ Relying on app-only filtering

**How RLS appears in pgAdmin**

Under:

.. code-block:: bash 

    students
    └── RLS Policies
        ├── students_select_own
        ├── students_insert_own
        ├── students_update_own
        └── students_delete_own

Each policy:
	- Has command type (SELECT/INSERT/UPDATE/DELETE)
	- Has expression (USING / WITH CHECK)

======================================================================================================================================

---------------------
RLS in real systems
---------------------

RLS is the foundation for:
	- PostgREST
	- Hasura
	- Supabase
	- Secure multi-tenant SaaS
	- API-first architectures

**Mental model (remember this)**

RLS = invisible WHERE clause enforced by PostgreSQL

Even:

.. code-block:: postgres 

    SELECT * FROM students;

Becomes:

.. code-block:: postgres 

    SELECT * FROM students
    WHERE owner_id = current_user_context;





