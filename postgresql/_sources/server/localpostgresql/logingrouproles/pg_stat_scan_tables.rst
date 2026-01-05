pg_stat_scan_tables
=====================

-------------------------------
What is pg_stat_scan_tables?
-------------------------------

pg_stat_scan_tables allows a role to read table-level scan statistics collected by PostgreSQL.

In simple terms:
    “I can see how tables are being scanned (sequential vs index scans).”

This role is **purely observational** and focused on **query performance analysis.**

------------------------
What this role ALLOWS
------------------------

A role with pg_stat_scan_tables can read **table scan statistics** from system views like:

Key system views
	- pg_stat_all_tables
	- pg_stat_user_tables

Example statistics it can see:

.. list-table::
    :header-rows: 1

    * - Metric
      - Meaning
    * - seq_scan
      - How many sequential scans occurred
    * - idx_scan
      - How many index scans occurred
    * - seq_tup_read
      - Rows read by seq scans
    * - idx_tup_fetch
      - Rows fetched via indexes
    * - n_tup_ins
      - Rows inserted
    * - n_tup_upd
      - Rows updated
    * - n_tup_del
      - Rows deleted
    * - n_live_tup
      - Estimated live rows
    * - n_dead_tup
      - Dead rows (bloat indicator)

-------------------------
What it does NOT allow
-------------------------

.. list-table::
    :header-rows: 1

    * - Capability
      - Allowed
    * - Read table data
      - ❌
    * - Modify table data
      - ❌
    * - Kill sessions
      - ❌
    * - Read server files
      - ❌
    * - View query text
      - ❌

It sees **counts**, not **content**

**Mental model**

pg_stat_scan_tables = **“Table performance dashboard”**

Think:
	- Index usage tracking
	- Table bloat detection
	- Query optimization support

**Example queries**

See scan behavior

.. code-block:: postgres 

    SELECT
        relname,
        seq_scan,
        idx_scan,
        n_live_tup,
        n_dead_tup
    FROM pg_stat_user_tables
    ORDER BY seq_scan DESC;

Find tables missing indexes

.. code-block:: postgres 

    SELECT relname
    FROM pg_stat_user_tables
    WHERE seq_scan > idx_scan
    ORDER BY seq_scan DESC;

Detect bloat candidates

.. code-block:: postgres 

    SELECT relname, n_dead_tup
    FROM pg_stat_user_tables
    WHERE n_dead_tup > 10000
    ORDER BY n_dead_tup DESC;

Relationship with other monitoring roles

.. list-table::
    :header-rows: 1

    * - Role
      - Purpose
    * - pg_stat_scan_tables
      - Table scan metrics
    * - pg_read_all_stats
      - Global statistics
    * - pg_monitor
      - Full monitoring bundle
    * - pg_read_all_data
      - Actual data

pg_monitor **includes** this role implicitly.

**🔐 Security level**

🟢 Low risk

Safe for:
  - Performance engineers
  - Read-only monitoring users
  - Analytics dashboards

❌ Should not be given to:
	- Public users (still internal metadata)

**Real-world usage**

Used by:
	- pgAdmin
	- pgbadger
	- Prometheus exporters
	- Datadog / New Relic
	- DBAs tuning indexes

**Grant / Revoke**

.. code-block:: postgres 

    GRANT pg_stat_scan_tables TO perf_user;

Revoke:

.. code-block:: postgres 

    REVOKE pg_stat_scan_tables FROM perf_user;

**Summary**

.. list-table::
    :header-rows: 1

    * - Feature
      - Value
    * - Access table data
      - ❌
    * - View scan stats
      - ✅
    * - Performance tuning
      - ✅
    * - Risk
      - 🟢 Low
    * - Cloud-safe
      - ✅



